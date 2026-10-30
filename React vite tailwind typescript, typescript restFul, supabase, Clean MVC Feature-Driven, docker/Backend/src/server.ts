import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { apiRouter } from '../api/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configuração do Swagger UI
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Template API RESTful',
      version: '1.0.0',
      description: 'Documentação interativa da API (Clean MVC + Envelope Pattern)',
    },
    servers: [{ url: `http://localhost:${port}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT Bearer',
        },
      },
    },
  },
  apis: import.meta.url.includes('/dist/')
    ? ['./dist/api/**/*.routes.js']
    : ['./api/**/*.routes.ts'],
});

// Middlewares essenciais
app.use(cors());
app.use(express.json());

// Log simples de requisições
app.use((req: Request, res: Response, next: NextFunction) => {
  const inicio = Date.now();
  res.on('finish', () => {
    if (req.originalUrl === '/' && req.method === 'GET') return;
    const duracaoMs = Date.now() - inicio;
    console.log(`[HTTP] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duracaoMs}ms)`);
  });
  next();
});

// Rota raiz — health check
app.get('/', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    message: 'API RESTful está rodando com sucesso.',
    docs: '/api/docs',
    timestamp: new Date().toISOString(),
  });
});

// Documentação interativa Swagger
app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  })
);

// Registro central dos endpoints (/api/exemplo, /api/auth, etc.)
app.use('/api', apiRouter);

// Middleware global de tratamento de erros
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Erro não tratado]:', err);
  res.status(500).json({
    sucesso: false,
    mensagem: 'Erro interno do servidor',
    detalhes: process.env.NODE_ENV === 'production' ? undefined : err.message,
  });
});

app.listen(port, () => {
  console.log(`[Backend] Servidor rodando em http://localhost:${port}`);
  console.log(`[Backend] Swagger UI disponível em http://localhost:${port}/api/docs`);
});
