-- =============================================================================
-- [SEM SUPABASE] Database/SemSupabase/database.sql
-- Schema Mestre para PostgreSQL Próprio (Docker Local ou VPS)
--
-- Como funciona:
--   - Executado automaticamente pelo container `postgres` do Docker Compose
--     na primeira subida (/docker-entrypoint-initdb.d/01-database.sql).
--   - Não depende de `auth.users` nem de `service_role` exclusivos do Supabase.
--   - Inclui tabela base `usuario` (com `senha_hash`) pronta para autenticação
--     JWT própria quando necessário, além da tabela da feature `exemplo`.
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------------------------
-- 1. Trigger utilitária para atualizar updated_at automaticamente
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.atualizar_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$;

-- -----------------------------------------------------------------------------
-- 2. Tabela Base de Usuários (Para Autenticação JWT Própria — Sem Supabase)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.usuario (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(160) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha_hash TEXT NOT NULL,
  status_ativo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

DROP TRIGGER IF EXISTS trg_usuario_updated_at ON public.usuario;
CREATE TRIGGER trg_usuario_updated_at
BEFORE UPDATE ON public.usuario
FOR EACH ROW
EXECUTE FUNCTION public.atualizar_updated_at();

-- -----------------------------------------------------------------------------
-- 3. Tabela da Feature de Referência: exemplo
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.exemplo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(160) NOT NULL CHECK (char_length(trim(nome)) >= 2),
  descricao TEXT,
  categoria VARCHAR(60) NOT NULL DEFAULT 'geral',
  status_ativo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_exemplo_status_ativo ON public.exemplo (status_ativo);
CREATE INDEX IF NOT EXISTS idx_exemplo_categoria ON public.exemplo (categoria);

DROP TRIGGER IF EXISTS trg_exemplo_updated_at ON public.exemplo;
CREATE TRIGGER trg_exemplo_updated_at
BEFORE UPDATE ON public.exemplo
FOR EACH ROW
EXECUTE FUNCTION public.atualizar_updated_at();
