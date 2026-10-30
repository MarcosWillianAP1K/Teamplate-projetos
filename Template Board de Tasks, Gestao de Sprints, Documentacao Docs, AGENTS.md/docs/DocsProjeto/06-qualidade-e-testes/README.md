# 06. Qualidade, Testes e Conformidade

Este diretório estabelece os critérios de garantia de qualidade (QA), automação de testes e homologação do software.

## O que documentar nesta pasta:
1. **Estratégia de Testes**:
   - **Testes Unitários**: Validação isolada de regras de negócio em Services e validação de DTOs.
   - **Testes de Integração**: Testes de rotas HTTP com Vitest ou Supertest.
   - **Testes End-to-End (E2E)**: Fluxos completos simulados no navegador (ex: Playwright ou Cypress).
2. **Quality Gates do CI/CD**:
   - Zero erros no compilador TypeScript (`typecheck`).
   - Todos os testes automatizados passando (`test`).
   - Linting e padronização de formatação respeitados.
3. **Roteiros de Homologação Manual**: Passo a passo detalhado para validação humana antes da subida em produção.
