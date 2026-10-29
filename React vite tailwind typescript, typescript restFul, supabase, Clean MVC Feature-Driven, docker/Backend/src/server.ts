import http from 'node:http';
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { apiRouter } from '../api/index.js';
import { ExemploGateway } from '../core/websocket/exemplo.gateway.js';
import {
  securityHeadersMiddleware,
  corsMiddleware,
  corsErrorHandler,
  validarOrigemCORS,
  obterOrigensAutorizadas,
} from '../core/middlewares/security-headers.middleware.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const httpServer = http.createServer(app);

// Inicialização do WebSocket (Socket.IO) integrado ao servidor HTTP com validação estrita de CORS
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: (origin, callback) => {
      if (validarOrigemCORS(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS não autorizado para WebSocket'));
      }
    },
    credentials: true,
  },
});

// Inicializa o Gateway WebSocket de Exemplo
ExemploGateway.inicializar(io);

// Swagger UI — documentação interativa em /api/docs
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project Template API',
      version: '1.0.0',
      description: 'Documentação interativa da API RESTful (Clean MVC + Envelope Pattern)',
    },
    servers: [{ url: `http://localhost:${port}` }],
    tags: [
      {
        name: 'Exemplo',
        description: 'Endpoints de referência seguindo o padrão Controller -> Service -> Model',
      },
    ],
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

// Headers de segurança HTTP e bloqueio de clickjacking / CSP / HSTS
app.use(securityHeadersMiddleware);

// Middleware CORS estrito com validação de origens confiáveis
app.use(corsMiddleware);
app.use(express.json());

// Middleware de observabilidade HTTP — registra todas as requisições recebidas no terminal
app.use((req: Request, res: Response, next: NextFunction) => {
  const inicio = Date.now();
  res.on('finish', () => {
    if (req.originalUrl === '/' && req.method === 'GET') return;
    const duracaoMs = Date.now() - inicio;
    console.log(
      `[Backend HTTP] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duracaoMs}ms)`
    );
  });
  next();
});

// Rota raiz — health check
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'API está rodando',
    status: 'online',
    docs: '/api/docs',
  });
});

// Swagger UI
app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  })
);

// Rotas da API (features MVC)
app.use('/api', apiRouter);

// Tratamento seguro de rejeições de CORS (HTTP 403 Forbidden)
app.use(corsErrorHandler);

httpServer.listen(port, () => {
  console.log(`[Backend] Servidor rodando na porta ${port}`);
  console.log(`[Backend] Swagger: http://localhost:${port}/api/docs`);
  console.log(`[Backend] Origens CORS autorizadas:`, obterOrigensAutorizadas());
});
