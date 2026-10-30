import { Router } from 'express';
import { exemploRoutes } from './exemplo/routes/exemplo.routes.js';

export const apiRouter = Router();

// Registra rotas das features da API (Recursos no singular)
apiRouter.use('/exemplo', exemploRoutes);
