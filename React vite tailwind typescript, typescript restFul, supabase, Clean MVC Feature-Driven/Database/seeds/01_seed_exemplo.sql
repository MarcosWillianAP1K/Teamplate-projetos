-- =============================================================================
-- [USO SUPABASE] Seed 01: Dados Iniciais da Tabela exemplo
-- =============================================================================

INSERT INTO public.exemplo (id, nome, descricao, categoria, status_ativo)
VALUES
  (
    '11111111-1111-4111-8111-111111111111',
    'Item de Exemplo Arquitetura MVC',
    'Registro demonstrativo do fluxo Controller -> Service -> Model.',
    'arquitetura',
    TRUE
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'Integração Frontend React 19 + Tailwind v4',
    'Consumo via HttpClient com Envelope Pattern e fallback resiliente.',
    'frontend',
    TRUE
  )
ON CONFLICT (id) DO NOTHING;
