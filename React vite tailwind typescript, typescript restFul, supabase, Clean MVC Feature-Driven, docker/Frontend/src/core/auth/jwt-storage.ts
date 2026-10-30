/**
 * ============================================================================
 * GERENCIAMENTO DE JWT LOCAL NO FRONTEND
 * ============================================================================
 * Armazena e recupera o token de acesso (access_token) no localStorage.
 * Utilizado para autenticar requisições enviando o header:
 * `Authorization: Bearer <token>`.
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
