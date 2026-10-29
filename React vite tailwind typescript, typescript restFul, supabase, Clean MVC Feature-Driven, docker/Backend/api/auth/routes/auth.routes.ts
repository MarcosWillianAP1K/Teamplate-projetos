/**
 * ============================================================================
 * LEMBRETE DE ARQUITETURA — ROTAS DE AUTENTICAÇÃO (`Backend/api/auth/routes`)
 * ============================================================================
 * Arquivo mantido como referência estrutural para quando o projeto precisar
 * implementar autenticação (Login, Cadastro, Refresh Token, Get Me).
 *
 * Para ativar no projeto:
 * 1. Implemente os métodos em `auth.controller.ts` e `auth.service.ts`.
 * 2. Registre `apiRouter.use('/auth', authRoutes)` em `Backend/api/index.ts`.
 * ============================================================================
 */

import { Router } from 'express';

export const authRoutes = Router();

// Exemplo de rotas para descomentar quando iniciar o módulo de Auth:
// authRoutes.post('/login', (req, res) => authController.login(req, res));
// authRoutes.post('/cadastro', (req, res) => authController.cadastrar(req, res));
// authRoutes.get('/me', authMiddleware, (req, res) => authController.obterPerfil(req, res));
