# Diretrizes de Engenharia e Contexto Arquitetural — Template Supabase

> **Stack:** React 19 + Vite + Tailwind CSS v4 + Node.js + Express + Supabase  
> **Arquiteturas Aplicadas:**  
> - **Backend:** Clean MVC (`Controller -> Service -> Model`)  
> - **Frontend:** Feature-Driven Clean Architecture (`src/features/{dominio}/`)  

---

## 1. Regras Arquiteturais Invioláveis

1. **TypeScript Estrito:** É expressamente proibido o uso de `any` em qualquer arquivo (`tsc --noEmit` deve passar com 0 erros).
2. **Nomenclatura Canônica:**
   * Métodos e funções: **`camelCase`** obrigatório (`buscarPorId()`, `desativar()`, `deletarHard()`).
   * Endpoints REST: Recursos sempre no **singular** (`/api/exemplo`). Sub-ações semânticas ao final da URI (`DELETE /api/exemplo/:id/hard`, `PATCH /api/exemplo/:id/reativar`).
3. **Envelope Pattern Categorizado:** Respostas de sucesso da API DEVEM adotar o formato `{ data: { [entidade]: ..., meta?: ... }, message: "..." }`. É proibido retornar dados soltos na raiz de `data` ou vazar segredos.
4. **Supabase & RLS:** Chaves de banco sempre UUID (`gen_random_uuid()`), Soft Delete padrão (`status_ativo = false`) e políticas de Row Level Security ativas. A `SUPABASE_SERVICE_ROLE_KEY` é de uso exclusivo do Backend.
5. **Tailwind CSS v4:** Classes utilitárias Tailwind diretas, mantendo o CSS base leve com variáveis `primary` e `secondary`.

---

## 2. Divisão de Camadas e Fluxo de Código

### 2.1. Backend (`Backend/api/{feature}/`)
* **`controllers/`:** Camada de orquestração HTTP. Extrai parâmetros e valida dados de entrada. Zero lógica de negócio.
* **`services/`:** Camada de domínio. Concentra regras de negócio e validações.
* **`models/`:** Camada de persistência. Realiza operações no banco via cliente Supabase (`core/supabase/supabase.client.ts`).
* **`routes/`:** Registra as rotas e anotações OpenAPI/Swagger.

### 2.2. Frontend (`Frontend/src/features/{feature}/`)
* **`pages/`:** Casca da tela. Cuida da composição estrutural e roteamento.
* **`components/`:** Componentes visuais da funcionalidade.
* **`services/`:** Chamadas à API REST através do cliente `http`.
* **`types/`:** Tipagens estritas da feature.

---

## 3. Gestão de Tarefas e Governança

Para planejar sprints, estruturar cards de tarefas no GitHub Projects ou documentar novos requisitos, utilize o template dedicado de governança disponível na raiz do catálogo:
`Template Board de Tasks, Gestao de Sprints, Documentacao Docs, AGENTS.md/`.
