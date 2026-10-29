# Template: Board de Tasks, Gestão de Sprints, Documentação Docs e AGENTS.md

Este template fornece a **estrutura completa de governança ágil, padrões de engenharia de software, modelos de cards de tarefas e documentação modular** para qualquer projeto de software.

Inspirado diretamente na metodologia de alta fidelidade desenvolvida no projeto **InTEA**, ele contém:

1. 📋 **`AGENTS.md`**: Guia mestre para agentes de IA e desenvolvedores:
   - Nomenclatura canônica dos cards: `Área: [Título] (Tipo: [Tipo])`.
   - Prefixos de área autorizados: `Back:`, `BD:`, `BD/Back:`, `Front:`, `Docs:`.
   - Tipos de cards autorizados: `Feature`, `Validação`, `Docs`, `Fix`.
   - **Template Obrigatório de 8 Campos** para cada card.
   - **Protocolo Anti-Conflito e Sequenciamento** (evita bloqueios entre membros e merge conflicts).
   - **Regra de Homologação Soberana do Usuário:** Critérios de aceite (`[ ]`) sempre desmarcados para conferência humana.
2. 📂 **`docs/DocsSprints/`**:
   - `visao_geral.md`: Hub central com matriz de sprints, status e requisitos rastreados.
   - `tasks/task_sprint_exemplo.md`: Arquivo de exemplo com cards prontos demonstrando todos os 4 tipos de cards e 8 campos obrigatórios.
   - `sprints/sprint-exemplo.md`: Modelo de relatório acadêmico de encerramento de sprint e retrospectiva.
3. 📚 **`docs/`**:
   - `architecture.md`: Manual arquitetural mestre (Clean MVC no Backend, Feature-Driven no Frontend, Envelope Pattern, etc.).
   - `roteiro-testes.md`: Quality Gate e casos de teste manuais ponta a ponta.
   - `ModelosDeContratos/exemploContrato.json`: Modelo canônico de JSON Schema para integrações.
   - `DocsProjeto/`: Estrutura modular para especificação de requisitos funcionais, não-funcionais, regras de negócio e diagramas Mermaid.
4. 🌐 **`mkdocs.yml`**: Configuração pronta do MkDocs Material para transformar toda a pasta `docs/` em um site estático navegável.

---

## 🛠️ Como Usar este Template no seu Projeto

1. Copie a pasta `docs/` e o arquivo `AGENTS.md` para a raiz do seu novo projeto (ou do seu template de código escolhido).
2. Abra `docs/DocsSprints/tasks/` e crie o arquivo da sua sprint atual (ex: `task_sprint_1.md`).
3. Cadastre os cards seguindo o template de 8 campos no seu GitHub Projects ou diretamente nos arquivos Markdown.
4. Mantenha os critérios de aceite desmarcados até a validação manual dos testes!
