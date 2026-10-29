# =============================================================================
# Dockerfile — Backend (Node.js / Express / TypeScript — API REST + Supabase)
# =============================================================================

# Stage 1: Build da aplicação TypeScript
FROM node:lts-alpine AS builder

RUN apk update && apk upgrade --no-cache

WORKDIR /app

COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .
RUN npm run build

# -----------------------------------------------------------------------------
# Stage: Desenvolvimento (Hot-reload com tsx watch e volumes)
# -----------------------------------------------------------------------------
FROM node:lts-alpine AS development

RUN apk update && apk upgrade --no-cache \
    && apk add --no-cache dumb-init

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

ENV NODE_ENV=development \
    PORT=3000

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "dev"]

# -----------------------------------------------------------------------------
# Stage 2: Imagem final de Produção
# -----------------------------------------------------------------------------
FROM node:lts-alpine AS production

RUN apk update && apk upgrade --no-cache \
    && apk add --no-cache dumb-init \
    && addgroup -g 1001 -S nodejs \
    && adduser -S appuser -u 1001 -G nodejs

ENV NODE_ENV=production \
    PORT=3000

WORKDIR /app

COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev --ignore-scripts; else npm install --omit=dev --ignore-scripts; fi \
    && npm cache clean --force \
    && rm -rf /usr/local/lib/node_modules/npm \
    && rm -rf /usr/local/lib/node_modules/corepack \
    && rm -rf /usr/local/bin/npm \
    && rm -rf /usr/local/bin/npx \
    && rm -rf /usr/local/bin/corepack \
    && rm -rf /root/.npm \
    && rm -rf /tmp/* \
    && rm -rf /var/cache/apk/*

COPY --from=builder --chown=appuser:nodejs /app/dist ./dist

USER appuser

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/src/server.js"]

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
    CMD wget -qO- http://localhost:3000/ || exit 1
