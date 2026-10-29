# Guia do Banco de Dados PostgreSQL (Docker Isolado)

Toda a infraestrutura do PostgreSQL está **100% isolada nesta pasta `Database/`**. Você não precisa instalar o PostgreSQL no seu computador, pois o Docker roda tudo isolado em container.

---

## 1. Arquivos da Pasta

* `Dockerfile`: Cria a imagem do PostgreSQL 16 e executa automaticamente `database.sql` e `seeds/01_seed_exemplo.sql`.
* `docker-compose.yml`: Sobe o PostgreSQL (porta `5432`) + o painel web Adminer (porta `8080`).
* `database.sql`: Schema com as tabelas `usuarios` (com `senha_hash` para autenticação JWT) e `exemplos`.
* `seeds/01_seed_exemplo.sql`: Dados iniciais de teste.
* `.env`: Variáveis do banco (`POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_PORT`).

---

## 2. Como Subir e Visualizar

Entre na pasta `Database` (`cd Database`):

```bash
# Sobe o PostgreSQL e o painel visual:
npm run up
# ou: docker compose up -d --build
```

### Visualizar tabelas no Navegador (Adminer):
1. Acesse: **`http://localhost:8080`**
2. Sistema: `PostgreSQL` | Servidor: `postgres` | Usuário: `postgres` | Senha: `postgres` | Banco: `template_db`
3. Clique em **Entrar** para visualizar e editar as tabelas visualmente!

### Desligar o banco:
```bash
npm run down
```

### Resetar do zero (recriar tabelas):
```bash
npm run reset
```
