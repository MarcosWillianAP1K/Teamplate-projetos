-- =============================================================================
-- Schema Mestre para PostgreSQL (Docker Local ou VPS)
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Trigger utilitária para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.atualizar_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$;

-- Tabela da Feature de Exemplo
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
