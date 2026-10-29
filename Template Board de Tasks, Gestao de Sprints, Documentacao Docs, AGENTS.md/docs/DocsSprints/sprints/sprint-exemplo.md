# Relatório de Encerramento e Retrospectiva — Sprint 1 (Exemplo)

> **Sprint:** 1  
> **Período:** Semana 1  
> **Status:** Concluída  
> **Tema Central:** Estruturação da Arquitetura Monorepo e Feature Exemplo  
> **Hub de Sprints:** [visao_geral.md](../visao_geral.md)  
> **Cards de Tarefas:** [task_sprint_exemplo.md](../tasks/task_sprint_exemplo.md)  

---

## 1. Visão Geral das Entregas

Nesta Sprint foram concebidos os alicerces arquiteturais do projeto, com a implementação da feature `exemplo` cobrindo ponta a ponta o banco de dados relacional, a API RESTful e a aplicação SPA frontend.

### Métricas de Execução:
* **Total de Cards Planejados:** 5
* **Cards Entregues:** 5 (100% de conclusão)
* **Cards Extras Assumidos:** 1 (Rate Limiting por IP)
* **Testes Automatizados:** 100% de aprovação (Vitest)

---

## 2. Detalhamento por Área

### 2.1. Banco de Dados (Database)
* Criação da migration `001_initial_schema.sql` com PKs em UUID e soft delete.
* Carga de dados iniciais em `seeds/01_seed_exemplo.sql`.

### 2.2. Back-end (Backend)
* Arquitetura Clean MVC (`Controller -> Service -> Model`).
* Payloads RESTful sanitizados no padrão Envelope Categorizado.
* Documentação OpenAPI interativa em `/api/docs`.

### 2.3. Front-end (Frontend)
* SPA construída com React 19 + Vite + Tailwind CSS v4.
* Componentes atômicos com estados controlados e modais interativos.
* Consumo resiliente com `http` client e chave Mock/API real.

---

## 3. Retrospectiva e Lições Aprendidas

### O que funcionou bem:
* **Algoritmo de Sequenciamento:** Desenvolver o Banco e Model nos primeiros 2 dias eliminou bloqueios no backend e permitiu ao frontend trabalhar com mocks até a integração final.
* **Fronteira Estrita de Arquivos:** Zero conflitos de merge durante a sprint.

### Pontos de melhoria para as próximas sprints:
* Iniciar a redação dos testes automatizados de integração em paralelo com o desenvolvimento dos controllers, reduzindo a carga no último dia.
