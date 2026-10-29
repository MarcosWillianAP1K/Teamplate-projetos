# Hub de Cards e Tarefas — Gestão de Sprints e GitHub Projects

> **Documento Mestre do Projeto:** `docs/DocsProjeto/01-visao-geral/01-contexto-e-problematica.md`  
> **Diretrizes e Quality Gate de Tasks:** `AGENTS.md`  
> **Arquitetura do Sistema:** `docs/architecture.md`  
> **Roteiro de Testes:** `docs/roteiro-testes.md`  

---

## 1. Visão Geral e Organização Modular

Para manter o planejamento leve, sustentável e com baixo consumo de processamento, os **Cards de Tarefas** são segmentados em arquivos dedicados por Sprint dentro do diretório [`tasks/`](./tasks/).

Cada arquivo contém o detalhamento integral dos cards (com fronteiras de arquivos, ordem sequencial anti-conflito, requisitos rastreados, descrições técnicas e critérios de aceite desmarcados).

Os relatórios formais e retrospectivas de cada Sprint residem em [`sprints/`](./sprints/).

---

## 2. Matriz de Navegação das Sprints e Arquivos de Tarefas

| Sprint | Período Planejado | Tema Central da Sprint | Requisitos Centrais | Arquivo de Tasks Isolado | Documento Oficial | Status |
| :---: | :---: | :--- | :--- | :---: | :---: | :---: |
| **Sprint 1** | Semana 1 | Configuração do Monorepo, Schemas Iniciais e Feature Exemplo | RF01, RF02, RNF01 | [task_sprint_exemplo.md](./tasks/task_sprint_exemplo.md) | [sprint-exemplo.md](./sprints/sprint-exemplo.md) | Concluída |
| **Sprint 2** | Semana 2 | Módulo de Autenticação JWT e Gestão de Usuários | RF03, RF04, RN01, RN02 | `tasks/task_sprint_2.md` | `sprints/sprint-2.md` | Em Andamento |
| **Sprint 3** | Semana 3 | Funcionalidades Principais de Negócio | RF05, RF06, RN03 | `tasks/task_sprint_3.md` | `sprints/sprint-3.md` | Planejada |

---

## 3. Resumo Executivo das Sprints

### 3.1. Sprint 1 — Base Monorepo e Feature Exemplo
* **Arquivo Detalhado:** [task_sprint_exemplo.md](./tasks/task_sprint_exemplo.md)
* **Escopo:** Criação do banco relacional, rotas REST no backend com Clean MVC, interface SPA em React com Tailwind CSS v4 e suíte de testes Vitest.
* **Documento da Sprint:** [sprint-exemplo.md](./sprints/sprint-exemplo.md)

---

## 4. Regras Obrigatórias para Criação de Novas Tasks

Ao criar ou auditar qualquer card para sprints presentes ou futuras, consulte obrigatoriamente as diretrizes em:
* [AGENTS.md — Seção 5: Padrão de Engenharia de Cards e Tasks](../../AGENTS.md) (Nomenclatura canônica, Tipos Feature/Validação/Docs/Fix, Template canônico de 8 campos e Sequenciamento anti-conflito).
* **Homologação Soberana do Usuário:** Todos os critérios de aceite (`[ ]`) permanecem rigorosamente desmarcados para auditoria e validação manual do usuário.
