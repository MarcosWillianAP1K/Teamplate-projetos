---
name: Card de Tarefa (Kanban / Sprint)
about: Criar um card de tarefa seguindo o padrão canônico de 8 campos do projeto
title: 'Área: [Título da Tarefa] (Tipo: Feature)'
labels: ['task']
assignees: ''
---

### Área: [Título da Tarefa] (Tipo: [Tipo])
<!-- Para correções, use: Área: (Fix) [Título da Tarefa] (Tipo: Fix) -->

* **Tipo:** Feature <!-- [Feature | Validação | Docs | Fix] -->
* **Responsável:** @usuario <!-- ou: Não atribuído (Backlog Arquitetural) -->
* **Fronteira de Arquivos:** `Backend/api/...`, `Frontend/src/...` <!-- arquivos exatos sob edição -->
* **Ordem de Execução / Dependência:** Independente <!-- ou: DEVE FAZER PRIMEIRO (Dias 1-2) | FAZ DEPOIS DE (Tarefa X) -->
* **Requisitos:** RFxx, RNxx, RNFxx
* **Referência Documentação:** docs/architecture.md
* **Descrição:** [Explicação técnica detalhada da mecânica real do que será construído e em qual camada]
* **Critérios de Aceite:**
  * [ ] [Critério 1 mensurável e testável]
  * [ ] [Critério 2 com códigos HTTP, regras de validação ou comportamentos visuais esperados]
  * [ ] [Critério 3 de conformidade estrita com qualidade de código e testes]
