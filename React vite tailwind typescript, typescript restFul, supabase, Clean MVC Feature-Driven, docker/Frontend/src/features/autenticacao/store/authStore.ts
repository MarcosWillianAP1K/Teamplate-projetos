/**
 * ============================================================================
 * LEMBRETE DE ARQUITETURA — STORE DE AUTENTICAÇÃO (`features/autenticacao/store`)
 * ============================================================================
 * Esqueleto limpo para lembrar onde gerenciar o estado global do usuário logado
 * e do token JWT com Zustand quando o projeto precisar de autenticação.
 * ============================================================================
 */

import { create } from "zustand";
import type { Usuario } from "../types/auth.types";

interface AuthState {
  usuario: Usuario | null;
  definirUsuario: (usuario: Usuario | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  usuario: null,
  definirUsuario: (usuario) => set({ usuario }),
}));
