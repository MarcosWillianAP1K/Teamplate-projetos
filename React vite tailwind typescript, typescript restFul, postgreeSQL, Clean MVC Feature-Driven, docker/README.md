# Template: React Vite Tailwind TypeScript + TypeScript RESTful + PostgreSQL + Clean MVC Feature-Driven + Docker

Starter template enxuto e auto-suficiente para novos projetos fullstack:
* **Backend:** Padrão **Clean MVC** (`Routes -> Controller -> Service -> Model`) em Node.js + Express + TypeScript.
* **Frontend:** Padrão **Feature-Driven Clean Architecture** (`src/features/{dominio}/`) em React 19 + Vite + Tailwind CSS v4.
* **Banco de Dados:** PostgreSQL 16 Alpine isolado na pasta `Database/` com container opcional do **Adminer** (`http://localhost:8080`) para gerenciamento visual.
* **DevOps:** Docker Compose para desenvolvimento e produção.

---

## 📂 Estrutura de Diretórios do Projeto

```text
├── Database/                                # Camada de Persistência PostgreSQL Isolada
│   ├── Dockerfile                           # Container PostgreSQL 16 Alpine
│   ├── docker-compose.yml                   # Sobe isoladamente o Postgres (5432) e Adminer (8080)
│   ├── package.json                         # Scripts: npm run up, down, reset
│   ├── .env & .env.example                  # Variáveis exclusivas do banco
│   ├── database.sql                         # Schema Mestre inicial
│   ├── migrations/                          # Migrações DDL sequenciais
│   │   └── 001_initial_schema.sql           # Tabela exemplo
│   ├── seeds/                               # Scripts DML de dados iniciais
│   │   └── 01_seed_exemplo.sql              # Dados demonstrativos iniciais
│   └── README.md                            # Guia do banco de dados
│
├── Backend/                                 # API RESTful (Node.js + Express + TypeScript)
│   ├── Dockerfile                           # Build multi-stage (Dev e Prod Alpine)
│   ├── package.json                         # Dependências (express, pg, swagger, vitest, etc.)
│   ├── tsconfig.json                        # Configuração estrita de compilação TypeScript
│   ├── .env & .env.example                  # Variáveis do servidor e credenciais do banco
│   ├── src/                                 # Ponto de Entrada do Servidor
│   │   └── server.ts                        # Inicialização do Express e Swagger (/api/docs)
│   ├── api/                                 # Módulos Funcionais REST (Clean MVC)
│   │   ├── index.ts                         # Roteador central que registra as rotas das features
│   │   └── exemplo/                         # Exemplo de Feature
│   │       ├── controllers/                 # Controllers HTTP (Envelope Pattern)
│   │       ├── services/                    # Regras de Negócio
│   │       ├── models/                      # Interface com o Banco / Persistência
│   │       ├── routes/                      # Rotas Express e Swagger Docs
│   │       ├── dtos/                        # Tipagens de Entrada e Saída
│   │       ├── validators/                  # Validações de payload
│   │       └── test/                        # Testes unitários com Vitest
│   └── core/                                # Infraestrutura Compartilhada do Backend
│       └── database/                        # Cliente de conexão PostgreSQL (postgres.client.ts)
│
├── Frontend/                                # SPA (React 19 + Vite + Tailwind CSS v4)
│   ├── Dockerfile & nginx.conf              # Servidor Nginx de produção
│   ├── package.json                         # Dependências (react, react-router-dom, tailwindcss v4)
│   ├── vite.config.ts & tsconfig*.json      # Configurações do Vite e TypeScript
│   ├── .env & .env.example                  # Variáveis de conexão com a API (VITE_API_URL)
│   └── src/                                 # Código-Fonte do Frontend
│       ├── App.tsx & main.tsx               # Montagem do RouterProvider
│       ├── routes/                          # Roteamento declarativo com MainLayout
│       ├── layout/                          # MainLayout (casca estrutural simples)
│       ├── shared/                          # Componentes e utilitários compartilhados
│       │   ├── components/ui/               # Primitivas visuais (ex: Button.tsx)
│       │   ├── lib/                         # Utilitários (cn com clsx + tailwind-merge)
│       │   └── utils/                       # Motor HTTP fetch (request.ts)
│       ├── core/                            # Cliente HTTP base e dicionário de endpoints
│       ├── styles/                          # Tailwind v4 com variáveis primary e secondary
│       └── features/                        # Arquitetura Orientada a Features
│           └── exemplo/                     # Exemplo de Feature
│               ├── pages/                   # Página da feature (ExemploPage.tsx)
│               ├── components/              # Componente visual (CardExemplo.tsx)
│               ├── services/                # Chamadas HTTP (exemplo.service.ts)
│               └── types/                   # Interfaces e contratos tipados da feature
│
├── docker-compose.yml                       # Orquestrador de Produção
├── docker-compose.override.yml              # Hot-Reload em Desenvolvimento
├── package.json                             # Scripts da raiz (dev, build, db:up, test)
├── AGENTS.md                                # Diretrizes arquiteturais
└── README.md                                # Este documento
```

---

## 🏛️ Como Seguir os Padrões da Arquitetura

### 1. No Back-end: Clean MVC
* **Routes (`api/{feature}/routes/`):** Declara endpoints, verbos HTTP e documentação Swagger.
* **Controller (`api/{feature}/controllers/`):** Extrai parâmetros da requisição, valida dados de entrada e retorna no Envelope Pattern:
  ```json
  {
    "data": {
      "exemplo": { "id": "uuid", "nome": "Item" }
    },
    "message": "Operação realizada com sucesso."
  }
  ```
* **Service (`api/{feature}/services/`):** Executa regras de negócio e validações.
* **Model (`api/{feature}/models/`):** Camada de acesso e persistência no PostgreSQL.

---

### 2. No Front-end: Feature-Driven Clean Architecture
* **Isolamento por Domínio:** Todo código de uma funcionalidade fica contido em `src/features/{nome-da-feature}/`.
* **Divisão de Pastas:**
  * `pages/`: Casca da tela. Posiciona os componentes e gerencia chamadas de alto nível.
  * `components/`: Componentes visuais específicos da funcionalidade.
  * `services/`: Chamadas à API via cliente HTTP oficial (`src/core/api/http-client.ts`).
  * `types/`: Declaração de interfaces e tipos estritos da feature.

---

## 🚀 Como Subir o Projeto

```bash
# Opção 1: Subir tudo com Docker Compose
docker compose up --build

# Opção 2: Subir apenas o Banco de Dados
npm run db:up   # ou cd Database && docker compose up -d

# Opção 3: Rodar Back e Front localmente
npm run dev
```

* **Frontend:** `http://localhost:5173`
* **Backend API:** `http://localhost:3000`
* **Swagger API Docs:** `http://localhost:3000/api/docs`
* **Adminer (Painel DB):** `http://localhost:8080`
