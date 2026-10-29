import { Router } from 'express';
import { exemploRoutes } from './exemplo/routes/exemplo.routes.js';
// import { authRoutes } from './auth/routes/auth.routes.js'; // Descomente quando implementar autenticação

export const apiRouter = Router();

// Registra rotas das features da API (Recursos sempre no singular)
apiRouter.use('/exemplo', exemploRoutes);
// apiRouter.use('/auth', authRoutes);
