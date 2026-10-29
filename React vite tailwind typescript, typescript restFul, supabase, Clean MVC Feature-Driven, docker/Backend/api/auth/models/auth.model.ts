/**
 * ============================================================================
 * LEMBRETE DE ARQUITETURA — MODEL DE AUTENTICAÇÃO (`Backend/api/auth/models`)
 * ============================================================================
 * Esqueleto limpo para consultas de usuário no banco de dados:
 * - No modo `SemSupabase`: consulte a tabela `public.usuarios` via `pg` (`core/SemSupabase/postgres.client.ts`).
 * - No modo `UsoSupabase`: consulte via `supabase.from('usuarios')` (`core/UsoSupabase/supabase.client.ts`).
 * ============================================================================
 */

export class AuthModel {
  // TODO: Implementar queries de busca/criação de usuário aqui
}

export const authModel = new AuthModel();
