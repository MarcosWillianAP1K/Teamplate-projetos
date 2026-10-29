-- =============================================================================
-- [SEM SUPABASE] Migration 001: Schema Inicial para PostgreSQL no Docker / VPS
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE OR REPLACE FUNCTION public.atualizar_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$;

CREATE TABLE IF NOT EXISTS public.usuario (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(160) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha_hash TEXT NOT NULL,
  status_ativo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE IF NOT EXISTS public.exemplo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(160) NOT NULL CHECK (char_length(trim(nome)) >= 2),
  descricao TEXT,
  categoria VARCHAR(60) NOT NULL DEFAULT 'geral',
  status_ativo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);
