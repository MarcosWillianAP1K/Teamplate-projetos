/**
 * ============================================================================
 * MODO: SEM SUPABASE (Autenticação JWT Própria)
 * ============================================================================
 * Quando NÃO utilizamos o Supabase Auth, o próprio Backend é responsável por:
 * 1. Gerar o token JWT no login usando `JWT_SECRET` (ex: biblioteca `jsonwebtoken`).
 * 2. Validar a assinatura do token JWT em cada requisição protegida neste middleware.
 *
 * DICA DE USO:
 * - Para usar assinatura criptográfica real, instale:
 *   `npm install jsonwebtoken && npm install -D @types/jsonwebtoken`
 * - Substitua a validação de exemplo abaixo por `jwt.verify(token, JWT_SECRET)`.
 * ============================================================================
 */

import { Request, Response, NextFunction } from 'express';

export interface UsuarioJwt {
  id: string;
  email?: string;
  cargo?: string;
}

export interface JwtAuthenticatedRequest extends Request {
  user?: UsuarioJwt;
}

export const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_desenvolvimento_trocar_em_producao';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Middleware de lembrete/esqueleto para validação de JWT próprio (Sem Supabase).
 */
export async function authJwtMiddleware(
  req: JwtAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'Acesso não autorizado. Envie o header Authorization: Bearer <token>.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!token || token.trim() === '') {
    res.status(401).json({ error: 'Token JWT não informado.' });
    return;
  }

  // TODO (SemSupabase): Descomentar ao instalar `jsonwebtoken`:
  // const payload = jwt.verify(token, JWT_SECRET) as UsuarioJwt;
  // req.user = payload;

  req.user = { id: '00000000-0000-4000-a000-000000000001', email: 'dev@local.test' };
  next();
}
