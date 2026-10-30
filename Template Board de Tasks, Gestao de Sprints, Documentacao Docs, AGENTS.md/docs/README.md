# Documentação Técnica e Governança do Projeto

Bem-vindo à documentação modular do projeto. Esta pasta centraliza toda a base de conhecimento de engenharia de software, contratos, sprints e roteiros de testes.

---

## 🗂️ Estrutura da Pasta `docs/`

```text
docs/
├── architecture.md           # Regras arquiteturais mestras, fluxos e convenções de código
├── roteiro-testes.md         # Casos de teste manuais e Quality Gate de homologação
│
├── DocsSprints/              # Gestão do Kanban e Cards de Tarefas (Sprints)
│   ├── visao_geral.md        # Hub mestre de navegação e resumo das sprints
│   ├── tasks/                # Arquivos isolados com os cards de tarefas de cada sprint
│   └── sprints/              # Relatórios e retrospectivas de sprint
│
├── DocsProjeto/              # Documentação modular estruturada por disciplina
│   ├── 01-visao-geral/       # Contexto, objetivos e escopo do produto
│   ├── 02-engenharia-requisitos/ # Requisitos funcionais, não-funcionais e regras de negócio
│   ├── 03-diagramas-arquiteturais/ # Diagramas Mermaid (C4, sequência, DER)
│   ├── 04-arquitetura-e-contratos/ # Padrões de projeto, contratos de API e segurança
│   ├── 05-sprints-e-evolucao/ # Roadmap, histórico de releases e decisões de sprint
│   └── 06-qualidade-e-testes/ # Estratégia de testes, Quality Gates e homologação
│
└── ModelosDeContratos/       # Esquemas JSON canônicos para contratos de integração
```
