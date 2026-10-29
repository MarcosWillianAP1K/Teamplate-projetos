# Catálogo de Starter Templates para Projetos

> **Intuito deste Repositório:**  
> Este repositório funciona como uma **galeria central de Starter Templates completos, desacoplados e prontos para uso**.  
> O objetivo principal é **eliminar o tempo perdido configurando novos projetos do zero**: em vez de reconfigurar TypeScript, Docker, Vite, Tailwind CSS, linters, routers, stores, estruturas de banco e padrões de cards de tarefas, você simplesmente **copia a pasta do template desejado**, renomeia para o nome do seu projeto e começa a programar imediatamente ou sobe o ambiente completo no Docker com um único comando.

---

## 🎯 Como Usar este Repositório

1. **Escolha o template** que atende às tecnologias e necessidades do seu projeto.
2. **Copie a pasta inteira do template** para o seu diretório de trabalho:
   ```bash
   cp -r "React vite tailwind typescript, typescript restFul, postgreeSQL, Clean MVC Feature-Driven, docker" "../meu-novo-projeto"
   ```
3. **Renomeie a pasta copiada** para o nome real da sua aplicação.
4. Abra o `README.md` que está dentro do projeto copiado e siga o passo a passo de execução.
5. *(Opcional)* Se o seu projeto precisa de governança com Sprints e GitHub Projects, copie também a estrutura do **Template de Board de Tasks e Documentação**!

---

## 🏷️ Padrão de Nomenclatura das Pastas

Para manter tudo previsível e facilitar a localização do template certo, as pastas de código seguem estritamente a convenção:

$$\text{[Tecnologias do Frontend]}, \text{[Tecnologias do Backend]}, \text{[Banco de Dados]}, \text{[Arquitetura]}, \text{[Extras]}$$

---

## 📦 Templates Disponíveis no Catálogo

### 1. [`React vite tailwind typescript, typescript restFul, postgreeSQL, Clean MVC Feature-Driven, docker`](./React%20vite%20tailwind%20typescript,%20typescript%20restFul,%20postgreeSQL,%20Clean%20MVC%20Feature-Driven,%20docker)
* **Frontend:** React 19 + Vite 7 + Tailwind CSS v4 (`@theme inline`) + Zustand 5 + TypeScript + HttpClient resiliente.
* **Backend:** Node.js + Express + Socket.IO + TypeScript + **Clean MVC + Fat Service** (`Controller -> Service -> Model`) + Swagger UI (`/api/docs`) + Helmet + Rate Limiter + Driver nativo `pg` + Autenticação JWT Própria.
* **Banco de Dados (100% isolado na pasta `Database/`):**
  * PostgreSQL 16 Alpine em container Docker.
  * Execução automática de tabelas (`database.sql`) e seeds de teste (`seeds/01_seed_exemplo.sql`).
  * **Painel Visual Web Adminer em `http://localhost:8080`** para visualizar e editar as tabelas pelo navegador (estilo Supabase Table Editor).
* **Docker:** `docker compose up --build` sobe Banco + Painel Adminer + Backend + Frontend integrados na mesma rede com hot-reload.

---

### 2. [`React vite tailwind typescript, typescript restFul, supabase, Clean MVC Feature-Driven`](./React%20vite%20tailwind%20typescript,%20typescript%20restFul,%20supabase,%20Clean%20MVC%20Feature-Driven)
* **Frontend:** React 19 + Vite 7 + Tailwind CSS v4 + Zustand 5 + TypeScript + Suporte opcional ao cliente Supabase.
* **Backend:** Node.js + Express + Socket.IO + TypeScript + **Clean MVC + Fat Service** + Swagger UI + Cliente oficial `@supabase/supabase-js` + Middleware de autenticação Supabase Auth.
* **Banco de Dados (pasta `Database/`):** Scripts SQL idempotentes prontos para colar e executar no *SQL Editor* do Supabase Cloud (`database.sql`, `migrations/` e `seeds/`), integrados com `auth.users`, UUID e Row Level Security (RLS).
* **Docker:** `docker compose up --build` disponível para subir Backend + Frontend containerizados apontando para o Supabase.

---

### 3. [`Template Board de Tasks, Gestao de Sprints, Documentacao Docs, AGENTS.md`](./Template%20Board%20de%20Tasks,%20Gestao%20de%20Sprints,%20Documentacao%20Docs,%20AGENTS.md)
* **Governança de Tarefas (Kanban & GitHub Projects):**
  * Baseado diretamente na metodologia de engenharia de software do projeto **InTEA**.
  * **Template Obrigatório de 8 Campos para Cards:** Tipo, Responsável, Fronteira de Arquivos, Ordem de Execução/Dependência, Requisitos, Referência Documentação, Descrição Técnica e Critérios de Aceite desmarcados (`[ ]`).
  * **Tipagem Canônica:** `Área: [Título] (Tipo: [Tipo])` com prefixos `Back:`, `BD:`, `BD/Back:`, `Front:`, `Docs:` e tipos `Feature`, `Validação`, `Docs`, `Fix`.
  * **Protocolo Anti-Conflito e Algoritmo de Sequenciamento:** Elimina bloqueios mútuos (Dependência Vertical Banco -> Back -> Front; Dependência Horizontal Componentes -> Página).
* **Documentação Modular e MkDocs (`docs/`):**
  * `DocsSprints/`: Hub de sprints (`visao_geral.md`), arquivos de tasks isolados (`task_sprint_exemplo.md`) e relatórios acadêmicos (`sprint-exemplo.md`).
  * `DocsProjeto/`: Estrutura modular para requisitos (RF, RNF, RN) e diagramas Mermaid.
  * `architecture.md`: Manual mestre de arquitetura.
  * `roteiro-testes.md`: Quality Gate e casos de teste manuais.
  * `mkdocs.yml`: Site estático navegável gerado com MkDocs Material.
