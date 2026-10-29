# Guia do Banco de Dados Supabase

Este template utiliza o **Supabase** como Banco de Dados relacional PostgreSQL gerenciado na nuvem, com suporte nativo a Row Level Security (RLS) e `auth.users`.

---

## 1. Como Configurar no Supabase Cloud

1. Acesse seu painel no [Supabase](https://supabase.com) e crie um novo projeto.
2. No menu lateral, acesse **SQL Editor**.
3. Copie o conteúdo de [database.sql](./database.sql) e cole no editor.
4. Clique em **Run** para criar a tabela `exemplos` e as políticas RLS.
5. Em seguida, copie o conteúdo de [seeds/01_seed_exemplo.sql](./seeds/01_seed_exemplo.sql) e clique em **Run** para carregar os dados de teste.

---

## 2. Como Obter as Chaves para o `.env`

1. No painel do seu projeto Supabase, acesse **Project Settings > API**.
2. Copie:
   * **Project URL:** cole em `SUPABASE_URL` no `Backend/.env` e `VITE_SUPABASE_URL` no `Frontend/.env`.
   * **anon / public key:** cole em `SUPABASE_ANON_KEY` no `Backend/.env` e `VITE_SUPABASE_ANON_KEY` no `Frontend/.env`.
   * **service_role key (secret):** cole em `SUPABASE_SERVICE_ROLE_KEY` no `Backend/.env` (NUNCA coloque no Frontend!).
