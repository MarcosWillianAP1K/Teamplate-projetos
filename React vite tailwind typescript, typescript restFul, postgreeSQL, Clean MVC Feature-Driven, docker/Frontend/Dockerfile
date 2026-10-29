# =============================================================================
# Dockerfile — Frontend (React 19 + Vite + Tailwind v4 → Nginx)
# =============================================================================

# Stage 1: Build do React com Vite
FROM node:lts-alpine AS builder

RUN apk update && apk upgrade --no-cache

WORKDIR /app

COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .

# Argumentos de build para variáveis públicas do Vite
ARG VITE_API_URL
ARG VITE_WS_URL
ARG VITE_USE_MOCK_DATA

ENV VITE_API_URL=$VITE_API_URL \
    VITE_WS_URL=$VITE_WS_URL \
    VITE_USE_MOCK_DATA=$VITE_USE_MOCK_DATA

RUN npm run build

# -----------------------------------------------------------------------------
# Stage: Desenvolvimento (Hot-reload com Vite HMR e volumes)
# -----------------------------------------------------------------------------
FROM node:lts-alpine AS development

RUN apk update && apk upgrade --no-cache

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

ENV NODE_ENV=development

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

# -----------------------------------------------------------------------------
# Stage 2: Produção com Nginx Alpine Slim
# -----------------------------------------------------------------------------
FROM nginx:alpine-slim AS production

RUN apk update && apk upgrade --no-cache \
    && rm -rf /var/cache/apk/*

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/app.conf

COPY --from=builder /app/dist /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && touch /var/run/nginx.pid \
    && chown nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 5173

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost:5173/nginx-health || exit 1

CMD ["nginx", "-g", "daemon off;"]
