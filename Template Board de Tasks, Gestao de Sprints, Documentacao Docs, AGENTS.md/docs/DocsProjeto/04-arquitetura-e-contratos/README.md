# 04. Arquitetura e Contratos de Integração

Este diretório especifica os contratos de comunicação e os padrões estruturais de engenharia aplicados no projeto.

## O que documentar nesta pasta:
1. **Padrões Arquiteturais**: Clean MVC no Backend (Controller -> Service -> Model) e Feature-Driven no Frontend (`features/<modulo>/`).
2. **Envelope Pattern**: Especificação do padrão de resposta da API:
   ```json
   {
     "data": { ... },
     "message": "Mensagem descritiva opcional"
   }
   ```
3. **Contratos de Endpoints REST**: Documentação das rotas, parâmetros de query, cabeçalhos obrigatórios e códigos HTTP retornados (200, 201, 400, 401, 404, 500).
4. **Segurança e Tokens**: Esquema de autenticação Bearer JWT e controle de acesso baseado em papéis (RBAC).
