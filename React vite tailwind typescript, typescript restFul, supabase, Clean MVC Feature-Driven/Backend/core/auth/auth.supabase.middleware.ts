/**
 * ============================================================================
 * MODO: USO SUPABASE (Middleware de Autenticação via Supabase Auth)
 * ============================================================================
 * Valida o token Bearer enviado pelo Frontend diretamente no Supabase Auth
 * através de `supabase.auth.getUser(token)`.
 *
 * QUANDO USAR:
 * - Apenas quando o projeto optar pela pasta `UsoSupabase`.
 * - Caso esteja usando PostgreSQL no Docker/VPS sem Supabase, utilize o
 *   middleware `core/SemSupabase/auth.jwt.middleware.ts`.
 * ============================================================================
 */

import { Request, Response, NextFunction } from 'express';
import { User } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase.client.js';

export type UsuarioSupabase = Partial<User> & {
  id: string;
  email?: string;
};

export interface SupabaseAuthenticatedRequest extends Request {
  user?: UsuarioSupabase;
}

export async function authSupabaseMiddleware(
  req: SupabaseAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Acesso não autorizado. Forneça um token no cabeçalho Authorization: Bearer <token>.',
      });
      return;
    }

    const token = authHeader.split(' ')[1];

    if (!token || token.trim() === '') {
      res.status(401).json({ error: 'Token JWT não informado após Bearer.' });
      return;
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      res.status(401).json({
        error: 'Token Supabase inválido ou expirado.',
        detalhes: error?.message,
      });
      return;
    }

    req.user = user;
    next();
  } catch (error: unknown) {
    console.error('[authSupabaseMiddleware]', error);
    res.status(500).json({ error: 'Erro interno ao validar autenticação no Supabase.' });
  }
}
