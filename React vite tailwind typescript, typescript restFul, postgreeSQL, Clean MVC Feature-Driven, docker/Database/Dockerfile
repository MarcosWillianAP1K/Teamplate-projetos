FROM postgres:16-alpine

# Executa automaticamente os scripts SQL na inicialização do container
COPY ./database.sql /docker-entrypoint-initdb.d/01-database.sql
COPY ./seeds/01_seed_exemplo.sql /docker-entrypoint-initdb.d/02-seed.sql

EXPOSE 5432
