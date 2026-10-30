# Template: React Vite Tailwind TypeScript + TypeScript RESTful + Supabase + Clean MVC Feature-Driven

Starter template enxuto e auto-suficiente para novos projetos integrados ao **Supabase**:
* **Backend:** Padrão **Clean MVC** (`Routes -> Controller -> Service -> Model`) em Node.js + Express + TypeScript integrado ao `@supabase/supabase-js`.
* **Frontend:** Padrão **Feature-Driven Clean Architecture** (`src/features/{dominio}/`) em React 19 + Vite + Tailwind CSS v4.
* **Banco de Dados:** Scripts SQL para o Supabase (tabela exemplo com Row Level Security).
* **DevOps:** Docker Compose opcional para rodar Backend e Frontend em containers.

---

## 📂 Estrutura de Diretórios do Projeto

```text
├── Database/                                # Scripts SQL para o Supabase
│   ├── database.sql                         # Schema consolidado com RLS
│   ├── migrations/                          # Migrações DDL sequenciais
│   │   └── 001_initial_schema_supabase.sql  # Tabela exemplo com políticas de segurança
│   ├── seeds/                               # Scripts DML de dados iniciais
│   │   └── 01_seed_exemplo.sql              # Dados demonstrativos iniciais
│   └── README.md                            # Como executar no SQL Editor do Supabase
│
├── Backend/                                 # API RESTful (Node.js + Express + TypeScript)
│   ├── Dockerfile                           # Build multi-stage seguro
│   ├── package.json                         # Dependências (@supabase/supabase-js, express, swagger, etc.)
│   ├── tsconfig.json                        # Configuração estrita de compilação TypeScript
│   ├── .env & .env.example                  # SUPABASE_URL, ANON_KEY e SERVICE_ROLE_KEY
│   ├── src/                                 # Ponto de Entrada do Servidor
│   │   └── server.ts                        # Inicialização do Express e Swagger (/api/docs)
│   ├── api/                                 # Módulos Funcionais REST (Clean MVC)
│   │   ├── index.ts                         # Roteador central da API
│   │   └── exemplo/                         # Exemplo de Feature
│   │       ├── controllers/                 # Controllers HTTP (Envelope Pattern)
│   │       ├── services/                    # Regras de Negócio
│   │       ├── models/                      # Interface com o Supabase
│   │       ├── routes/                      # Rotas Express e Swagger Docs
│   │       ├── dtos/                        # Tipagens de Entrada e Saída
│   │       ├── validators/                  # Validações de payload
│   │       └── test/                        # Testes unitários com Vitest
│   └── core/                                # Infraestrutura Compartilhada
│       └── supabase/                        # Cliente oficial @supabase/supabase-js (supabase.client.ts)
│
├── Frontend/                                # SPA (React 19 + Vite + Tailwind CSS v4)
│   ├── Dockerfile & nginx.conf              # Servidor Nginx de produção
│   ├── package.json                         # Dependências (react, react-router-dom, tailwindcss v4)
│   ├── vite.config.ts & tsconfig*.json      # Configurações do Vite e TypeScript
│   ├── .env & .env.example                  # VITE_API_URL, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
│   └── src/                                 # Código-Fonte do Frontend
│       ├── App.tsx & main.tsx               # Montagem do RouterProvider
│       ├── routes/                          # Roteamento declarativo com MainLayout
│       ├── layout/                          # MainLayout (casca estrutural simples)
│       ├── shared/                          # Componentes e utilitários compartilhados
│       │   ├── components/ui/               # Primitivas visuais (ex: Button.tsx)
│       │   ├── lib/                         # Utilitários (cn com clsx + tailwind-merge)
│       │   └── utils/                       # Motor HTTP fetch (request.ts)
│       ├── core/                            # Cliente HTTP base e configuração Supabase
│       │   ├── api/                         # http-client.ts e endpoints.ts
│       │   └── supabase/                    # Configuração opcional do Supabase no Frontend
│       ├── styles/                          # Tailwind v4 com variáveis primary e secondary
│       └── features/                        # Arquitetura Orientada a Features
│           └── exemplo/                     # Exemplo de Feature
│               ├── pages/                   # Página da feature (ExemploPage.tsx)
│               ├── components/              # Componente visual (CardExemplo.tsx)
│               ├── services/                # Chamadas HTTP (exemplo.service.ts)
│               └── types/                   # Interfaces e contratos tipados da feature
│
├── docker-compose.yml                       # Orquestrador Docker (Backend + Frontend)
├── docker-compose.override.yml              # Hot-Reload em Desenvolvimento
├── package.json                             # Scripts da raiz (dev, build, test)
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
* **Model (`api/{feature}/models/`):** Camada de acesso e persistência no Supabase.

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

# Opção 2: Rodar Back e Front localmente
npm run dev
```

* **Frontend:** `http://localhost:5173`
* **Backend API:** `http://localhost:3000`
* **Swagger API Docs:** `http://localhost:3000/api/docs`
