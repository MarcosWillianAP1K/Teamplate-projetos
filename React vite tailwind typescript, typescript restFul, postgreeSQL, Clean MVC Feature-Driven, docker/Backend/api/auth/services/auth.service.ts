/**
 * ============================================================================
 * LEMBRETE DE ARQUITETURA — SERVICE DE AUTENTICAÇÃO (`Backend/api/auth/services`)
 * ============================================================================
 * Esqueleto limpo para a regra de negócio de autenticação:
 *
 * - MODO SEM SUPABASE (`core/SemSupabase`):
 *   Valide a senha com `bcrypt` na tabela `usuarios` do PostgreSQL (Docker/VPS)
 *   e assine o token JWT usando `JWT_SECRET`.
 *
 * - MODO USO SUPABASE (`core/UsoSupabase`):
 *   Utilize `supabase.auth.signInWithPassword({ email, password })`.
 * ============================================================================
 */

export class AuthService {
  // TODO: Implementar regras de negócio de autenticação aqui
}

export const authService = new AuthService();
