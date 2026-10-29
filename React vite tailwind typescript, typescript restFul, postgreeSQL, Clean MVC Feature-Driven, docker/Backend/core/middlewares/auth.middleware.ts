import { Request } from 'express';
import { authJwtMiddleware, UsuarioJwt, JwtAuthenticatedRequest } from '../auth/auth.jwt.middleware.js';

export type UsuarioAutenticado = UsuarioJwt;
export type AuthenticatedRequest = JwtAuthenticatedRequest;

/**
 * Middleware central de autenticação JWT da aplicação.
 */
export const authMiddleware = authJwtMiddleware;
