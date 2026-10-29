# Diretrizes de Engenharia e Contexto Arquitetural — Template PostgreSQL Docker

> **Stack:** React 19 + Vite 7 + Tailwind CSS v4 + Zustand 5 + Node.js + Express + Socket.IO + PostgreSQL 16 + Docker  
> **Arquiteturas Aplicadas:**  
> - **Backend:** Clean MVC + Fat Service (`Controller -> Service -> Model`)  
> - **Frontend:** Feature-Driven Clean Architecture (`src/features/{dominio}/`)  

---

## 1. Regras Arquiteturais Invioláveis

1. **TypeScript Estrito:** É expressamente proibido o uso de `any` em qualquer arquivo (`tsc --noEmit` deve passar com 0 erros).
2. **Nomenclatura Canônica:**
   * Métodos e funções: **`camelCase`** obrigatório (`buscarPorId()`, `desativar()`, `deletarHard()`).
   * Endpoints REST: Recursos sempre no **singular** (`/api/exemplo`). Sub-ações semânticas ao final da URI (`DELETE /api/exemplo/:id/hard`, `PATCH /api/exemplo/:id/reativar`).
3. **Envelope Pattern Categorizado:** Respostas de sucesso da API DEVEM adotar o formato `{ data: { [entidade]: ..., meta?: ... }, message: "..." }`. É proibido retornar dados soltos na raiz de `data` ou vazar segredos.
4. **Soft Delete Padrão:** Registros inativados recebem `status_ativo = false`. Exclusão física (`hard delete`) é restrita a rotas utilitárias de desenvolvimento.
5. **Tailwind CSS v4:** Classes utilitárias e valores arbitrários (como `w-[42px]`) são permitidos sem disparar avisos no Linter (regra ignorada em `.vscode/settings.json`).

---

## 2. Divisão de Camadas e Fluxo de Código

### 2.1. Backend (`Backend/api/{feature}/`)
* **`controllers/`:** Camada de orquestração HTTP. Extrai parâmetros e valida DTOs de entrada. **Zero lógica de negócio.**
* **`services/`:** Camada de domínio (**Fat Service**). Concentra todas as regras de negócio, invariantes, emissão de eventos e regras de auditoria.
* **`models/`:** Camada de persistência. Realiza operações no banco PostgreSQL (`core/database/postgres.client.ts`).
* **`routes/`:** Registra as rotas e anotações OpenAPI/Swagger.

### 2.2. Frontend (`Frontend/src/features/{feature}/`)
* **`pages/`:** Casca da tela. Cuida da composição estrutural e roteamento.
* **`components/`:** Componentes visuais atômicos ou modulares.
* **`store/`:** Gerenciamento de estado global com Zustand.
* **`services/`:** Chamadas à API REST através de `http` com chave `withFallback` / `safeRequest`.
* **`types/`:** Tipagens estritas da feature.

---

## 3. Gestão de Tarefas e Governança

Para planejar sprints, estruturar cards de tarefas no GitHub Projects ou documentar novos requisitos, utilize o template dedicado de governança disponível na raiz do catálogo:
`Template Board de Tasks, Gestao de Sprints, Documentacao Docs, AGENTS.md/`.
