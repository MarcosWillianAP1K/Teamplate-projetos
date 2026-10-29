# Diretrizes e Contexto do Projeto (Template de Governança, Board e Documentação)

> **Documento Mestre do Projeto:** `docs/DocsProjeto/01-visao-geral/01-contexto-e-problematica.md`  
> **Regras Arquiteturais:** `docs/architecture.md`  
> **Hub de Sprints e Cards de Tarefas:** `docs/DocsSprints/visao_geral.md`  
> **Roteiro de Testes e Homologação:** `docs/roteiro-testes.md`  

---

## 1. Visão Arquitetural Macro (3 Camadas)

1. **Banco de Dados (Database):** Modelagem relacional em 3ª Forma Normal (3FN), PKs/FKs estritamente em UUID (`gen_random_uuid()`), migrações sequenciais numeradas com 3 dígitos (`001_*.sql`), seeds determinísticas e exclusão lógica obrigatória (**Soft Delete** com `status_ativo = false`).
2. **Back-end (Backend):** API RESTful desenvolvida sob o padrão **Clean MVC + Fat Service** (`Controller -> Service -> Model`), TypeScript estrito (zero `any`), documentação OpenAPI/Swagger interativa (`/api/docs`), headers de segurança Helmet, Rate Limiter e **Envelope Pattern Categorizado** obrigatório.
3. **Front-end (Frontend):** Single-Page Application (SPA) estruturada sob **Feature-Driven Clean Architecture** (`src/features/{dominio}/`), TypeScript estrito, estado global com Zustand, HttpClient resiliente com fila de refresh 401 e chave de Mock/API real (`withFallback` / `safeRequest`).

---

## 2. Invariantes e Regras de Negócio Invioláveis (RNs do Projeto)

Ao implementar qualquer funcionalidade, o desenvolvedor ou agente de IA DEVE respeitar as regras invioláveis do sistema:

- **RN01 (Tipagem Estrita e Validação de DTOs):** Todo payload recebido pela API DEVE ser validado na entrada pelo Controller. Campos inválidos ou fora de domínio retornam **`400 Bad Request`** ou **`422 Unprocessable Entity`**. Proibido conversão por fallback cego.
- **RN02 (Isolamento e Controle de Acesso):** Operações que envolvem dados restritos exigem validação de permissão institucional. Acessos indevidos retornam **`403 Forbidden`** e tokens ausentes/inválidos retornam **`401 Unauthorized`**.
- **RN03 (Inalterabilidade e Rastreabilidade do Histórico):** É terminantemente proibido executar `hard delete` em entidades principais do sistema. Exclusões DEVEM adotar exclusivamente `soft delete` (`status_ativo = false`).
- **RN04 (Envelope Pattern Categorizado e Sanitização):** Respostas de sucesso da API DEVEM adotar o formato `{ data: { [entidade]: ..., meta?: ... }, message: "..." }`. É terminantemente proibido vazar propriedades soltas na raiz de `data` ou expor segredos/hashes de senha.

---

## 3. Diretrizes de Código e Padrões Técnicos

- **TypeScript Estrito:** Proibido o uso de `any` em qualquer camada do monorepo (`tsc --noEmit` deve passar com 0 erros).
- **Nomenclatura Obrigatória:**
  - Métodos em Controllers, Models e Services: **`camelCase`** obrigatório (`deletarHard()`, `buscarPorId()`, `listar()`).
  - Endpoints REST: Recursos sempre no **singular** (`/api/exemplo`, `/api/usuario`). Sub-ações semânticas ao final da URI (`DELETE /api/exemplo/:id/hard`, `PATCH /api/exemplo/:id/reativar`).
- **Qualidade e Testes:** O projeto utiliza **Vitest** (`npm test`). Nenhuma alteração é submetida sem garantir 100% dos testes verdes.

---

## 4. Filosofia de Trabalho e Pareamento (Didática & Autonomia)

- **Foco em Aprendizado e Domínio do Código:** O usuário prioriza entender os mecanismos reais da arquitetura. Sempre explique o *quem faz*, *onde faz*, *qual arquivo executa* e *por que a decisão foi tomada*.
- **Rastreabilidade Prática:** Aponte sempre os arquivos e funções exatas envolvidas (`Frontend/src/...`, `Backend/...`, `Database/...`).
- **Autonomia na Homologação de Critérios (Palavra Final do Usuário):** É terminantemente **PROIBIDO** ao agente de IA marcar caixas de critérios de aceite (`[x]`) em arquivos de tasks, sprints ou documentação (`docs/DocsSprints/...`). Todos os critérios de aceite DEVEM permanecer sempre desmarcados (`[ ]`) para que o próprio usuário realize a conferência, validação e marcação manual no Git/GitHub Projects, mantendo a palavra final sobre as entregas.

---

## 5. Padrão de Engenharia de Cards e Tasks (GitHub Projects & Sprints)

Esta seção define o protocolo obrigatório para concepção, estruturação, sequenciamento e governança dos **Cards de Tarefas** de cada Sprint no GitHub Projects e na pasta [`docs/DocsSprints/`](./docs/DocsSprints/).

---

### 5.1. Nomenclatura e Tipagem Canônica dos Cards

O título de qualquer card DEVE seguir estritamente o formato:  
`Área: [Título Claro e Conciso da Tarefa] (Tipo: [Tipo])`

* **Prefixos de Área Permitidos:**
  * `Back:` — Serviços, controllers, middlewares e rotas REST do backend (`Backend/api/...`, `Backend/core/...`).
  * `BD:` — Migrações DDL/DML, triggers e schemas de banco (`Database/migrations/...`, `Database/seeds/...`).
  * `BD/Back:` — Tarefas integradas onde o mesmo responsável cria a migração de banco e o model/serviço correspondente.
  * `Front:` — Telas, páginas, componentes visuais, hooks, stores e estilos (`Frontend/src/...`).
  * `Docs:` — Especificação OpenAPI/Swagger, relatórios de sprint, casos de teste manuais e governança do Kanban.

* **Tipos de Card Permitidos:**
  * `Feature` — Entrega de nova funcionalidade de negócio, endpoint, componente visual ou regra operacional.
  * `Validação` — Implementação de testes automatizados (unitários, integração), verificações estritas de segurança, validação de schemas/DTOs e auditoria.
  * `Docs` — Artefatos formais de documentação, especificações técnicas de contratos e roteiros de testes manuais.
  * `Fix` — Correção de vulnerabilidades, débitos técnicos de sprints anteriores ou não conformidades. O título deve conter a tag `(Fix)`: `Área: (Fix) [Título Claro] (Tipo: Fix)`.

---

### 5.2. Template Obrigatório de Estrutura de Card (8 Campos)

Todo card elaborado para o GitHub Projects ou documentação DEVE conter impreterivelmente os 8 campos abaixo:

```markdown
### Área: [Título da Tarefa] (Tipo: [Tipo])
<!-- Para correções, usar: ### Área: (Fix) [Título da Tarefa] (Tipo: Fix) -->

* **Tipo:** [Feature | Validação | Docs | Fix]
* **Responsável:** [Nome do Integrante (@usuario_github)] | [Não atribuído (Backlog Arquitetural)] (para Extras)
* **Fronteira de Arquivos:** `caminho/arquivo1.ts`, `caminho/arquivo2.tsx` (lista exata de arquivos sob domínio)
* **Ordem de Execução / Dependência:** [Independente | DEVE FAZER PRIMEIRO (Dias X-Y) | FAZ DEPOIS DE (Tarefa Z) / INTEGRAÇÃO SEQUENCIAL]
* **Requisitos:** [RFxx, RNxx, RNFxx rastreados formalmente do documento mestre]
* **Referência Documentação:** [Seção, Tabela ou Contrato JSON em docs/]
* **Descrição:** [Explicação técnica detalhada da mecânica real: o que será construído, em qual camada, por que e como interage com os contratos]
* **Critérios de Aceite:**
  * [ ] [Critério 1 mensurável e testável]
  * [ ] [Critério 2 com códigos HTTP, regras de validação ou comportamentos visuais esperados]
  * [ ] [Critério 3 de conformidade estrita com RNs e qualidade de código]
```

---

### 5.3. Cards Extras (Backlog de Reforço Arquitetural)

* **Definição e Uso:** Tarefas técnicas de segurança avançada, resiliência de infraestrutura, cache, otimizações de banco ou acessibilidade identificadas durante auditorias.
* **Regra de Não-Atribuição:** Cards Extras **NUNCA são associados a um membro específico** no planejamento inicial. Eles figuram com `Responsável: Não atribuído (Backlog Arquitetural)` e status `Ready` no Kanban, podendo ser assumidos como adiantamento livre por quem terminar suas tarefas antecipadamente.

---

### 5.4. Protocolo Anti-Conflito e Algoritmo de Sequenciamento (Ordem de Execução)

Para extinguir conflitos de merge e bloqueios mútuos, todo planejamento de tasks DEVE aplicar as 3 regras de sequenciamento abaixo:

#### Regra 1: Dependência Vertical (Banco $\rightarrow$ Backend REST $\rightarrow$ Consumidor Front)
* **Quem faz primeiro:** Quem cria a tabela, migration SQL ou modelo de dados fundamental **DEVE FAZER PRIMEIRO (Dias 1 a 2)**.
* **Quem faz depois:** Serviços e páginas consumidoras trabalham nos primeiros dias operando **em memória ou com mocks desacoplados**. Ao final, realizam a importação da função real entregue pelo primeiro desenvolvedor.
* **Benefício:** Ninguém fica ocioso esperando o banco subir e não há arquivos concorrentes sendo editados simultaneamente.

#### Regra 2: Dependência Horizontal no Front-end (Componentes Atômicos $\rightarrow$ Página Mestre)
* **Quem faz primeiro:** O desenvolvedor de componentes atômicos constrói os cards, modais e formulários isoladamente na pasta `components/`, testando com fixtures nos primeiros dias.
* **Quem faz depois:** O desenvolvedor da página mestre cria a casca da página (`pages/`), cabeçalhos e navegação deixando **slots visuais (placeholders)**, integrando os componentes finalizados na sequência.

#### Regra 3: Fronteira de Arquivos Estrita
* Nenhum card pode declarar arquivos que já estejam sob edição primária de outro card ativo na mesma Sprint, salvo pontos de montagem explicitamente coordenados.
