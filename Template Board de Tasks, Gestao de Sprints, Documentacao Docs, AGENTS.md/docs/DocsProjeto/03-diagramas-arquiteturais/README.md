# 03. Diagramas Arquiteturais

Este diretório contém os diagramas visuais da arquitetura do sistema em Markdown (usando sintaxe Mermaid) ou diagramas exportados.

## O que documentar nesta pasta:
1. **Diagrama C4 - Nível 1 (Contexto)**: Visão macro do sistema integrado aos usuários externos e serviços legados/terceiros.
2. **Diagrama C4 - Nível 2 (Contêineres)**: Divisão de responsabilidade entre Frontend (SPA React/Vite), Backend (RESTful Express), Banco de Dados (PostgreSQL/Supabase) e Docker.
3. **Diagramas de Sequência (Mermaid `sequenceDiagram`)**: Fluxo temporal detalhado de ponta a ponta (Frontend -> Controller -> Service -> Model -> Database).
4. **Diagrama Entidade-Relacionamento (DER / Mermaid `erDiagram`)**: Modelagem lógica das tabelas, chaves primárias, chaves estrangeiras e índices do banco de dados.
5. **Diagramas de Máquina de Estados**: Ciclos de vida de entidades centrais (ex: status de um pedido, status de aprovação de um cadastro).
