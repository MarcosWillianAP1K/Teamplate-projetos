/**
 * ============================================================================
 * LEMBRETE DE ARQUITETURA — SERVICE DE AUTENTICAÇÃO (`features/autenticacao/services`)
 * ============================================================================
 * Esqueleto para implementar chamadas de login, cadastro e logout.
 * Integra-se ao storage de JWT (`core/auth/jwt-storage.ts`).
 * ============================================================================
 */

import { jwtStorage } from "@/core/auth/jwt-storage";

export const authService = {
  getStoredToken: (): string | null => {
    return jwtStorage.obterToken();
  },

  logoutService: (): void => {
    jwtStorage.limparToken();
  },
};

export const getStoredToken = authService.getStoredToken;
export const logoutService = authService.logoutService;
