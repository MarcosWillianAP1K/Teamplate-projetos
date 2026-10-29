import { Request } from 'express';
import {
  authSupabaseMiddleware,
  UsuarioSupabase,
  SupabaseAuthenticatedRequest,
} from '../auth/auth.supabase.middleware.js';

export type UsuarioAutenticado = UsuarioSupabase;
export type AuthenticatedRequest = SupabaseAuthenticatedRequest;

/**
 * Middleware central de autenticação via Supabase Auth.
 */
export const authMiddleware = authSupabaseMiddleware;
