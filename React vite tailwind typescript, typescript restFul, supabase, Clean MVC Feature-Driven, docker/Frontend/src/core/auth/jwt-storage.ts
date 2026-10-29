/**
 * ============================================================================
 * MODO: SEM SUPABASE (Gerenciamento de JWT Próprio no Frontend)
 * ============================================================================
 * Quando o projeto roda com PostgreSQL no Docker/VPS sem Supabase, o Backend
 * emite um token JWT próprio que é armazenado localmente e enviado no header
 * `Authorization: Bearer <token>` pelo `http-client.ts`.
 * ============================================================================
 */

const ACCESS_TOKEN_KEY = "access_token";

export const jwtStorage = {
  obterToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  salvarToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  limparToken(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};
