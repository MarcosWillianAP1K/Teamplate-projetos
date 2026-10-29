/**
 * ============================================================================
 * ENDPOINTS DA API REST (Dicionário Tipado Central)
 * Evita strings hardcoded espalhadas pelos services e páginas.
 * Convenção: Recursos sempre no singular e sub-ações semânticas no final.
 * ============================================================================
 */

export const ENDPOINTS = {
  EXEMPLO: {
    BASE: "/exemplo",
    BY_ID: (id: string) => `/exemplo/${id}`,
    REATIVAR: (id: string) => `/exemplo/${id}/reativar`,
    HARD_DELETE: (id: string) => `/exemplo/${id}/hard`,
  },
  // Lembrete para quando implementar autenticação no projeto:
  // AUTH: {
  //   LOGIN: "/auth/login",
  //   CADASTRO: "/auth/cadastro",
  //   ME: "/auth/me",
  // },
} as const;

export type Endpoints = typeof ENDPOINTS;
