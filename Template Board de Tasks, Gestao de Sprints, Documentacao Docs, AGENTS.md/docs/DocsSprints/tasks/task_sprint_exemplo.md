# Cards de Tarefas — Sprint Exemplo: Base Monorepo e Feature de Referência

> **Sprint:** 1 (Exemplo)  
> **Tema Central:** Estruturação da Arquitetura Clean MVC + Feature-Driven e Feature Exemplo  
> **Diretrizes e Quality Gate:** [AGENTS.md](../../../AGENTS.md) (Seção 5)  
> **Hub de Tarefas Geral:** [visao_geral.md](../visao_geral.md)  

---

## 1. Diretrizes Operacionais e Modelo de Execução da Sprint

* **Critérios de Aceite Sempre Desmarcados:** Todas as caixas `[ ]` permanecem desmarcadas para que o desenvolvedor realize a validação e homologação manual.
* **Ordem de Execução Anti-Conflito:** Dependência Vertical estrita (Banco -> Backend REST -> Frontend).

---

## 2. Cards Principais da Sprint

---

### BD/Back: Migração SQL e Modelo de Persistência da Feature Exemplo (Tipo: Feature)

* **Tipo:** Feature
* **Responsável:** Desenvolvedor Backend (@dev_backend)
* **Fronteira de Arquivos:** `Database/migrations/001_initial_schema.sql`, `Database/database.sql`, `Backend/api/exemplo/models/exemplo.model.ts`
* **Ordem de Execução / Dependência:** **DEVE FAZER PRIMEIRO (Dias 1 a 2)**. Cria a tabela relacional no PostgreSQL e expõe as queries tipadas no Model antes da implementação das rotas e controllers.
* **Requisitos:** RF01, RNF01, RN03
* **Referência Documentação:** docs/architecture.md (Seção 2 e Seção 3.3)
* **Descrição:** Criar a migração DDL idempotente `001_initial_schema.sql` definindo a tabela `exemplos` com PK em UUID (`id UUID PRIMARY KEY DEFAULT gen_random_uuid()`), campos `nome`, `descricao`, `categoria`, `status_ativo BOOLEAN DEFAULT true` e timestamps `created_at` e `updated_at`. Implementar a classe `ExemploModel` no backend exportando métodos tipados `listar()`, `buscarPorId()`, `criar()`, `atualizar()`, `desativar()` (soft delete) e `deletarHard()`.
* **Critérios de Aceite:**
  * [ ] Migração SQL executada sem erros no PostgreSQL e sincronizada em `Database/database.sql`.
  * [ ] Model implementado em TypeScript estrito (zero `any`) e métodos em `camelCase`.
  * [ ] Suporte a Soft Delete (`status_ativo = false`) no método `desativar()`.

---

### Back: Endpoints RESTful e Validação de DTOs da Feature Exemplo (Tipo: Feature)

* **Tipo:** Feature
* **Responsável:** Desenvolvedor Backend (@dev_backend)
* **Fronteira de Arquivos:** `Backend/api/exemplo/controllers/exemplo.controller.ts`, `Backend/api/exemplo/services/exemplo.service.ts`, `Backend/api/exemplo/routes/exemplo.routes.ts`, `Backend/api/exemplo/dtos/exemplo.dto.ts`
* **Ordem de Execução / Dependência:** **Dias 2 a 3 (Após entrega do Model)**. Constrói os endpoints REST e validações de regras de negócio.
* **Requisitos:** RF01, RF02, RN01, RN04
* **Referência Documentação:** docs/architecture.md (Seção 3.4 — Envelope Pattern)
* **Descrição:** Implementar a camada `ExemploService` contendo as regras de negócio e validações de unicidade. Criar `ExemploController` expondo os métodos HTTP (`GET /api/exemplo`, `GET /api/exemplo/:id`, `POST /api/exemplo`, `PUT /api/exemplo/:id`, `PATCH /api/exemplo/:id/reativar`, `DELETE /api/exemplo/:id`), aplicando validação de DTOs na entrada e retornando respostas estritamente no Envelope Pattern Categorizado (`{ data: { exemplo: ... }, message: "..." }`).
* **Critérios de Aceite:**
  * [ ] Todos os endpoints retornando status HTTP semânticos (200, 201, 400, 404).
  * [ ] Respostas de sucesso formatadas no padrão Envelope `{ data: { ... }, message }`.
  * [ ] Documentação OpenAPI/Swagger anotada em `exemplo.routes.ts`.

---

### Front: Interface SPA, Tabela e Modal da Feature Exemplo (Tipo: Feature)

* **Tipo:** Feature
* **Responsável:** Desenvolvedor Frontend (@dev_frontend)
* **Fronteira de Arquivos:** `Frontend/src/features/exemplo/pages/ExemploPage.tsx`, `Frontend/src/features/exemplo/components/CardExemplo.tsx`, `Frontend/src/features/exemplo/components/DialogCriarExemplo.tsx`, `Frontend/src/features/exemplo/store/exemplo.store.ts`
* **Ordem de Execução / Dependência:** **Dias 3 a 4 (Integração sequencial com a API entregue)**. Nos dias 1 e 2, atua construindo os componentes visuais com mocks via `withFallback`.
* **Requisitos:** RF01, RF02, RNF02
* **Referência Documentação:** docs/architecture.md (Seção 4 — Feature-Driven)
* **Descrição:** Criar a página mestre `ExemploPage.tsx` com cabeçalho, barra de busca, filtro por categoria e grid de listagem. Implementar `DialogCriarExemplo.tsx` com formulário controlado e feedback visual de carregamento. Gerenciar o estado global da listagem e modais na store Zustand `exemplo.store.ts`. Consumir os endpoints através de `exemplo.service.ts` utilizando o `http` client resiliente.
* **Critérios de Aceite:**
  * [ ] Layout responsivo construído com Tailwind CSS v4 e suporte a modo Dark/Light.
  * [ ] Criação e listagem sincronizadas com a store Zustand e feedback de toast/loading.
  * [ ] Tratamento gracioso de erros de rede sem quebrar a renderização da aplicação.

---

### Back/Front: Suíte de Testes Automatizados no Vitest (Tipo: Validação)

* **Tipo:** Validação
* **Responsável:** QA / Desenvolvedor Fullstack (@qa_dev)
* **Fronteira de Arquivos:** `Backend/api/exemplo/test/exemplo.test.ts`, `Frontend/src/features/exemplo/__test__/exemplo.service.test.ts`
* **Ordem de Execução / Dependência:** **Dia 5 (Encerramento da Sprint)**. Executa validação de regressão e cobertura de testes.
* **Requisitos:** RNF03
* **Referência Documentação:** docs/roteiro-testes.md
* **Descrição:** Implementar testes unitários e de integração no Vitest para o backend (testando validações de DTOs, métodos do service e endpoints do controller) e para o frontend (testando chamadas do service com spy e comportamento do fallback).
* **Critérios de Aceite:**
  * [ ] 100% dos testes executados com sucesso via `npm test` no backend e frontend.
  * [ ] Cobertura de cenários de sucesso e fluxos de erro (dados inválidos, item não encontrado).

---

### Docs: Atualização do Roteiro de Testes e Documentação OpenAPI (Tipo: Docs)

* **Tipo:** Docs
* **Responsável:** Documentador Técnico (@tech_writer)
* **Fronteira de Arquivos:** `docs/roteiro-testes.md`, `docs/DocsSprints/sprints/sprint-exemplo.md`
* **Ordem de Execução / Dependência:** **Dias 4 a 5**. Formaliza os casos de teste e redige o relatório de entrega da Sprint.
* **Requisitos:** RNF01
* **Referência Documentação:** docs/DocsSprints/visao_geral.md
* **Descrição:** Documentar os casos de teste manuais para validação ponta a ponta da feature exemplo em `docs/roteiro-testes.md`. Redigir o relatório da Sprint 1 em `docs/DocsSprints/sprints/sprint-exemplo.md` consolidando itens entregues, lições aprendidas e débitos técnicos.
* **Critérios de Aceite:**
  * [ ] Casos de teste manuais descritos com pré-condições, passos e resultado esperado.
  * [ ] Relatório da Sprint preenchido com retrospectiva e métricas.

---

### Back: (Fix) Correção de Invalidação de Cache e Sanitização de DTO (Tipo: Fix)

* **Tipo:** Fix
* **Responsável:** Desenvolvedor Backend (@dev_backend)
* **Fronteira de Arquivos:** `Backend/api/exemplo/services/exemplo.service.ts`
* **Ordem de Execução / Dependência:** **Dia 5**. Correção pontual identificada na auditoria de homologação.
* **Requisitos:** RN01, RN04
* **Referência Documentação:** docs/architecture.md (Seção 3.4)
* **Descrição:** Corrigir sanitização de strings no payload de atualização para remover espaços em branco nas extremidades (`trim()`) e assegurar que campos não informados não sobrescrevam dados existentes com `null`.
* **Critérios de Aceite:**
  * [ ] Validação de payload sanitizando campos com `trim()`.
  * [ ] Testes de regressão passando 100%.

---

## 3. Cards Extras (Backlog de Reforço Arquitetural)

* **Definição:** Tarefas técnicas de segurança, resiliência ou auditoria que não possuem responsável fixo no início da Sprint.

---

### Back: Implementação de Rate Limiting por IP nos Endpoints de Mutação (Tipo: Validação)

* **Tipo:** Validação
* **Responsável:** Não atribuído (Backlog Arquitetural)
* **Fronteira de Arquivos:** `Backend/core/middlewares/rate-limit.middleware.ts`, `Backend/api/exemplo/routes/exemplo.routes.ts`
* **Ordem de Execução / Dependência:** Independente. Pode ser assumida por qualquer desenvolvedor após conclusão de suas tarefas principais.
* **Requisitos:** RNF05
* **Referência Documentação:** docs/architecture.md (Seção 3.3)
* **Descrição:** Configurar middleware de rate-limiting nos endpoints `POST`, `PUT` e `DELETE` limitando a no máximo 60 requisições por minuto por IP para proteção contra abuso.
* **Critérios de Aceite:**
  * [ ] Disparo de HTTP `429 Too Many Requests` ao exceder a taxa limite.
  * [ ] Headers `RateLimit-*` presentes nas respostas HTTP.
