# Template: React Vite Tailwind TypeScript + TypeScript RESTful + PostgreSQL + Clean MVC Feature-Driven + Docker

Starter template completo, enxuto e auto-suficiente para novos projetos fullstack seguindo a arquitetura de alta fidelidade do projeto **InTEA**:
* **Backend:** Padrão **Clean MVC + Fat Service** (`Routes -> Controller -> Service -> Model`) em Node.js + Express + TypeScript.
* **Frontend:** Padrão **Feature-Driven Clean Architecture** (`src/features/{dominio}/`) em React 19 + Vite 7 + Tailwind CSS v4 + Zustand 5.
* **Banco de Dados:** PostgreSQL 16 Alpine isolado na pasta `Database/` com **Adminer** (painel visual web em `http://localhost:8080`) para ver e editar tabelas pelo navegador.
* **DevOps:** Docker Compose completo com Hot-Reload para desenvolvimento ou simulação cliente-servidor em rede.

---

## 📂 Estrutura Completa de Diretórios do Projeto

```text
├── Database/                                # Camada de Persistência Relacional Isolada
│   ├── Dockerfile                           # Container PostgreSQL 16 Alpine com inicialização automática
│   ├── docker-compose.yml                   # Sobe isoladamente o Postgres (5432) e o Adminer (8080)
│   ├── package.json                         # Scripts: npm run up, down, reset, logs
│   ├── .env & .env.example                  # Variáveis exclusivas do banco (POSTGRES_USER, etc.)
│   ├── database.sql                         # Schema Mestre consolidado (Single Source of Truth)
│   ├── migrations/                          # Migrações DDL sequenciais idempotentes
│   │   └── 001_initial_schema.sql           # Tabelas: usuarios (com senha_hash para JWT) e exemplos
│   ├── seeds/                               # Scripts DML de dados iniciais
│   │   └── 01_seed_exemplo.sql              # Dados demonstrativos iniciais
│   └── README.md                            # Guia passo a passo para iniciantes em PostgreSQL
│
├── Backend/                                 # API RESTful + Gateway WebSocket (Node.js + Express + TypeScript)
│   ├── Dockerfile                           # Build multi-stage seguro (Dev com Hot-Reload e Prod Alpine)
│   ├── package.json                         # Dependências estritas (pg, express, helmet, vitest, etc.)
│   ├── tsconfig.json                        # Configuração estrita de compilação TypeScript (zero any)
│   ├── .env & .env.example                  # Variáveis do servidor e credenciais do banco
│   ├── src/                                 # Ponto de Entrada do Servidor
│   │   └── server.ts                        # Inicialização do Express, Socket.IO, Swagger e Helmet
│   ├── api/                                 # Módulos Funcionais REST (Clean MVC)
│   │   ├── index.ts                         # Roteador central que registra as rotas das features
│   │   ├── exemplo/                         # Feature de Referência Completa
│   │   │   ├── controllers/                 # Controllers HTTP (exemplo.controller.ts)
│   │   │   ├── services/                    # Regras de Negócio e Invariantes (exemplo.service.ts)
│   │   │   ├── models/                      # Interface com o Banco / Memória (exemplo.model.ts)
│   │   │   ├── routes/                      # Rotas e Swagger Docs (exemplo.routes.ts)
│   │   │   ├── dtos/                        # Tipagens de Entrada e Saída (exemplo.dto.ts)
│   │   │   ├── validators/                  # Validações estritas de payload
│   │   │   └── test/                        # Testes automatizados unitários e de integração
│   │   └── auth/                            # Lembretes Estruturais para Autenticação Própria (JWT)
│   │       ├── controllers/, services/, models/, routes/
│   └── core/                                # Infraestrutura Compartilhada do Backend
│       ├── database/                        # Cliente de conexão PostgreSQL (postgres.client.ts)
│       ├── auth/                            # Middleware JWT próprio (auth.jwt.middleware.ts)
│       ├── middlewares/                     # Security Headers, Rate Limiter, Error Handler
│       ├── utils/                           # Formatadores e validadores puros (CPF, CEP, UUID)
│       ├── websocket/                       # Gateway Socket.IO (exemplo.gateway.ts)
│       └── events/                          # Barramento de eventos (event-bus.ts)
│
├── Frontend/                                # Single-Page Application (React 19 + Vite + Tailwind v4)
│   ├── Dockerfile & nginx.conf              # Servidor Nginx de produção com proxy reverso e healthcheck
│   ├── package.json                         # Dependências (lucide-react, zustand, tailwind v4, etc.)
│   ├── vite.config.ts & tsconfig*.json      # Configurações do Vite e TypeScript
│   ├── .env & .env.example                  # Variáveis de conexão com a API (VITE_API_URL)
│   └── src/                                 # Código-Fonte do Frontend
│       ├── App.tsx & main.tsx               # Montagem dos provedores e roteamento raiz
│       ├── routes/                          # Roteamento declarativo com React Router DOM v7
│       ├── layout/                          # Layouts Mestres (SidebarLayout e FocusLayout)
│       ├── shared/                          # Componentes Globais e Primitivas de UI
│       │   ├── components/ui/               # 17 componentes Radix UI / shadcn customizados
│       │   ├── hooks/                       # Hooks reutilizáveis (use-mobile, etc.)
│       │   ├── providers/                   # Provedor de Tema (Light / Dark)
│       │   └── utils/                       # Utilitários de requisição e styling (cn)
│       ├── core/                            # Comunicação e Estado Central
│       │   ├── api/                         # http-client.ts (resiliente com JWT e fallback) e endpoints.ts
│       │   └── auth/                        # jwt-storage.ts (persistência segura do token)
│       └── features/                        # Arquitetura Orientada a Features (Vertical Slice)
│           ├── exemplo/                     # Feature de Referência Completa
│           │   ├── pages/                   # Casca da tela (ExemploPage.tsx)
│           │   ├── components/              # Componentes modulares (CardExemplo, DialogCriarExemplo)
│           │   ├── hooks/                   # Hooks específicos da feature (useExemplo.ts)
│           │   ├── store/                   # Estado global da feature via Zustand (exemplo.store.ts)
│           │   ├── services/                # Chamadas HTTP (exemplo.service.ts)
│           │   ├── types/                   # Interfaces e contratos tipados da feature
│           │   └── __test__/                # Testes no Vitest (exemplo.service.test.ts)
│           └── autenticacao/                # Lembretes Estruturais de Telas de Login e Cadastro
│
├── docker-compose.yml                       # Orquestrador de Produção (Postgres + Adminer + Back + Front)
├── docker-compose.override.yml              # Hot-Reload em Desenvolvimento
├── package.json                             # Scripts da raiz (dev, build, db:up, typecheck, test)
├── AGENTS.md                                # Manual arquitetural e diretrizes de desenvolvimento
└── README.md                                # Este documento
```

---

## 🏛️ Como Seguir os Padrões da Arquitetura

### 1. No Back-end: Clean MVC + Fat Service
* **Routes (`api/{feature}/routes/`):** Apenas declara o endpoint, verbos HTTP e middlewares (`authMiddleware`, `rateLimit`). Não deve conter código de regra de negócio.
* **Controller (`api/{feature}/controllers/`):**
  * Extrai os parâmetros da requisição (`req.params`, `req.query`, `req.body`).
  * Valida a tipagem básica e aciona o Service.
  * Formata a resposta sempre no **Envelope Pattern Categorizado**:
    ```json
    {
      "data": {
        "exemplo": { "id": "uuid", "nome": "Item" }
      },
      "message": "Operação realizada com sucesso."
    }
    ```
  * Nunca executa queries de banco de dados diretamente.
* **Service (`api/{feature}/services/`):**
  * O cérebro da funcionalidade (**Fat Service**).
  * Executa 100% das regras de negócio, invariantes, cálculos, envio de eventos pelo `eventBus` e emissão via WebSocket.
* **Model (`api/{feature}/models/`):**
  * Camada exclusiva de acesso e persistência no banco relacional PostgreSQL (`core/database/postgres.client.ts`).
  * Retorna sempre tipos TypeScript estritos.

---

### 2. No Front-end: Feature-Driven Clean Architecture
* **Isolamento por Domínio:** Todo código referente a uma funcionalidade fica contido dentro de sua respectiva pasta em `src/features/{nome-da-feature}/`.
* **Divisão de Responsabilidades:**
  * `pages/`: Casca visual da tela. Gerencia navegação, títulos, breadcrumbs e posiciona os componentes.
  * `components/`: Componentes atômicos e modulares (cards, modais, formulários, tabelas).
  * `store/`: Gerencia o estado global da feature via Zustand (ex: abrir modal, filtros ativos, itens selecionados).
  * `services/`: Executa chamadas à API através da instância oficial do `http` client (`src/core/api/http-client.ts`), utilizando `withFallback` ou `safeRequest`.
  * `types/`: Declaração de interfaces e contratos tipados da feature (proibido `any`).

---

### 3. Como Criar uma Nova Feature (Passo a Passo)

1. **Banco de Dados:**
   * Crie o script SQL em `Database/migrations/002_sua_feature.sql`.
   * Adicione a definição da tabela em `Database/database.sql`.
2. **Back-end:**
   * Duplique a pasta de referência `Backend/api/exemplo/` para `Backend/api/sua-feature/`.
   * Ajuste o Controller, Service e Model.
   * Registre o novo recurso no roteador principal em `Backend/api/index.ts`:
     ```ts
     apiRouter.use('/sua-feature', suaFeatureRoutes);
     ```
3. **Front-end:**
   * Duplique `Frontend/src/features/exemplo/` para `Frontend/src/features/sua-feature/`.
   * Cadastre a URL do endpoint no dicionário `Frontend/src/core/api/endpoints.ts`.
   * Registre a rota visual em `Frontend/src/routes/index.tsx`.

---

## 🚀 Como Iniciar o Projeto

### Opção 1: Subir TUDO no Docker (1 Comando)
```bash
docker compose up --build
```
* **PostgreSQL:** `localhost:5432` (user: `postgres`, senha: `postgres`, banco: `template_db`)
* **Painel Visual das Tabelas (Adminer):** `http://localhost:8080`
* **Backend API REST:** `http://localhost:3000/api/exemplo`
* **Documentação Swagger:** `http://localhost:3000/api/docs`
* **Frontend SPA:** `http://localhost:5173`

### Opção 2: Subir o Banco no Docker e Rodar Node/React Localmente
```bash
# 1. Sobe apenas o PostgreSQL e o Adminer em background
npm run db:up

# 2. Instala dependências do monorepo
npm install
npm run install:all

# 3. Roda Backend e Frontend simultâneos com hot-reload
npm run dev
```

---

## 🧪 Quality Gate e Validação

```bash
# Validação estrita de tipos TypeScript em todo o monorepo (0 erros)
npm run typecheck

# Execução de 100% dos testes no Vitest
npm test
```
