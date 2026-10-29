# Template: React Vite Tailwind TypeScript + TypeScript RESTful + Supabase + Clean MVC Feature-Driven

Starter template completo, enxuto e auto-suficiente para novos projetos integrados ao **Supabase Cloud**, seguindo os padrões arquiteturais de alta fidelidade do projeto **InTEA**:
* **Backend:** Padrão **Clean MVC + Fat Service** (`Routes -> Controller -> Service -> Model`) em Node.js + Express + TypeScript integrado ao `@supabase/supabase-js`.
* **Frontend:** Padrão **Feature-Driven Clean Architecture** (`src/features/{dominio}/`) em React 19 + Vite 7 + Tailwind CSS v4 + Zustand 5.
* **Banco de Dados & Autenticação:** Supabase Cloud (PostgreSQL gerenciado, Row Level Security e Supabase Auth).
* **DevOps:** Docker Compose opcional para rodar Backend e Frontend em containers apontando para o Supabase.

---

## 📂 Estrutura Completa de Diretórios do Projeto

```text
├── Database/                                # Scripts SQL para o Supabase Cloud
│   ├── database.sql                         # Schema consolidado com RLS e auth.users
│   ├── migrations/                          # Migrações DDL sequenciais
│   │   └── 001_initial_schema_supabase.sql  # Tabela exemplos e políticas de segurança
│   ├── seeds/                               # Scripts DML de dados iniciais
│   │   └── 01_seed_exemplo.sql              # Dados demonstrativos iniciais
│   └── README.md                            # Como colar e rodar no SQL Editor do Supabase
│
├── Backend/                                 # API RESTful + Gateway WebSocket (Node.js + Express + TypeScript)
│   ├── Dockerfile                           # Build multi-stage seguro
│   ├── package.json                         # Dependências (@supabase/supabase-js, express, etc.)
│   ├── tsconfig.json                        # Configuração estrita de compilação TypeScript (zero any)
│   ├── .env & .env.example                  # SUPABASE_URL, ANON_KEY e SERVICE_ROLE_KEY
│   ├── src/                                 # Ponto de Entrada do Servidor
│   │   └── server.ts                        # Inicialização do Express, Socket.IO, Swagger e Helmet
│   ├── api/                                 # Módulos Funcionais REST (Clean MVC)
│   │   ├── index.ts                         # Roteador central da API
│   │   ├── exemplo/                         # Feature de Referência Completa
│   │   │   ├── controllers/, services/, models/, routes/, dtos/, validators/, test/
│   │   └── auth/                            # Lembretes para Supabase Auth
│   └── core/                                # Infraestrutura Compartilhada
│       ├── supabase/                        # Cliente oficial @supabase/supabase-js (supabase.client.ts)
│       ├── auth/                            # Middleware Supabase Auth (auth.supabase.middleware.ts)
│       ├── middlewares/                     # Security Headers, Rate Limiter, Error Handler
│       ├── utils/                           # Formatadores e validadores puros
│       ├── websocket/                       # Gateway Socket.IO
│       └── events/                          # Barramento de eventos
│
├── Frontend/                                # Single-Page Application (React 19 + Vite + Tailwind v4)
│   ├── Dockerfile & nginx.conf              # Servidor Nginx de produção
│   ├── package.json                         # Dependências (lucide-react, zustand, tailwind v4, etc.)
│   ├── vite.config.ts & tsconfig*.json      # Configurações do Vite e TypeScript
│   ├── .env & .env.example                  # VITE_API_URL, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
│   └── src/                                 # Código-Fonte do Frontend
│       ├── App.tsx & main.tsx               # Montagem dos provedores e roteamento raiz
│       ├── routes/                          # Roteamento declarativo com React Router DOM v7
│       ├── layout/                          # Layouts Mestres (SidebarLayout e FocusLayout)
│       ├── shared/                          # Componentes Globais e Primitivas Radix UI / shadcn
│       ├── core/                            # Comunicação e Estado Central
│       │   ├── api/                         # http-client.ts e endpoints.ts
│       │   └── supabase/                    # Configuração opcional do Supabase no Frontend
│       └── features/                        # Arquitetura Orientada a Features (Vertical Slice)
│           ├── exemplo/                     # Feature de Referência Completa (pages, components, store, services, types)
│           └── autenticacao/                # Lembretes Estruturais de Telas de Login e Cadastro
│
├── docker-compose.yml                       # Orquestrador Docker (Backend + Frontend)
├── docker-compose.override.yml              # Hot-Reload em Desenvolvimento
├── package.json                             # Scripts da raiz (dev, build, docker:up, typecheck, test)
├── AGENTS.md                                # Manual arquitetural e diretrizes de desenvolvimento
└── README.md                                # Este documento
```

---

## 🏛️ Como Seguir os Padrões da Arquitetura

### 1. No Back-end: Clean MVC + Fat Service
* **Routes (`api/{feature}/routes/`):** Apenas declara endpoints, verbos HTTP e middlewares.
* **Controller (`api/{feature}/controllers/`):** Valida DTOs de entrada e retorna no **Envelope Pattern Categorizado**:
  ```json
  {
    "data": { "exemplo": { "id": "uuid", "nome": "Item" } },
    "message": "Operação realizada com sucesso."
  }
  ```
* **Service (`api/{feature}/services/`):** Centraliza 100% das regras de negócio, validações e invariantes.
* **Model (`api/{feature}/models/`):** Interface de acesso aos dados via cliente Supabase (`core/supabase/supabase.client.ts`).

---

### 2. No Front-end: Feature-Driven Clean Architecture
* **Organização Vertical por Domínio:** Cada pasta em `src/features/{feature}/` contém suas próprias `pages/`, `components/`, `store/`, `services/` e `types/`.
* **Consumo de API:** Realizado através do `http` client (`src/core/api/http-client.ts`), utilizando `withFallback` e `safeRequest`.

---

## 🚀 Como Iniciar o Projeto

1. **Configure o Banco de Dados no Supabase:**
   * Crie um projeto gratuito em [supabase.com](https://supabase.com).
   * Abra o **SQL Editor**, cole o conteúdo de `Database/database.sql` e execute.
   * Cole o conteúdo de `Database/seeds/01_seed_exemplo.sql` e execute.
2. **Configure as Chaves nos Arquivos `.env`:**
   * Obtenha a URL e as chaves no painel do Supabase (**Project Settings > API**).
   * Preencha `Backend/.env` (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
   * Preencha `Frontend/.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
3. **Instale e Inicie Localmente:**
   ```bash
   npm install
   npm run install:all
   npm run dev
   ```
   * **Backend API:** `http://localhost:3000/api/exemplo`
   * **Swagger:** `http://localhost:3000/api/docs`
   * **Frontend:** `http://localhost:5173`

*(Opcional: Para rodar Backend e Frontend em Docker, execute `docker compose up --build`).*
