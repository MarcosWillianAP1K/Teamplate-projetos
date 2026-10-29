import type { Server as SocketIOServer, Socket } from 'socket.io';
import { SocketRateLimiter } from './socket.limiter.js';

/**
 * ==============================================================================
 * Gateway WebSocket de Exemplo (Socket.IO)
 * Demonstra a arquitetura de salas em tempo real e proteção contra flood.
 * ==============================================================================
 */
export class ExemploGateway {
  private static io: SocketIOServer | null = null;
  private static limiter = SocketRateLimiter.obterInstancia();

  /**
   * Initializes the WebSocket gateway and registers connection listeners.
   *
   * @param ioServer - Socket.IO server instance attached to the HTTP server.
   */
  static inicializar(ioServer: SocketIOServer): void {
    this.io = ioServer;

    this.io.on('connection', (socket: Socket) => {
      socket.on('entrar_sala', (payload: { salaId?: string }) => {
        const checagem = this.limiter.verificarLimite(socket.id, 'entrar_sala');
        if (!checagem.permitido) {
          socket.emit('erro_limite', checagem);
          return;
        }

        if (payload?.salaId && typeof payload.salaId === 'string') {
          void socket.join(payload.salaId);
          socket.emit('sala_conectada', {
            salaId: payload.salaId,
            conectadoEm: new Date().toISOString(),
          });
        }
      });

      socket.on('ping_presenca', (dados?: { timestamp_cliente?: number }) => {
        const checagem = this.limiter.verificarLimite(socket.id, 'ping_presenca');
        if (!checagem.permitido) {
          socket.emit('erro_limite', checagem);
          return;
        }

        const agora = Date.now();
        socket.emit('pong_presenca', {
          status: 'online',
          timestamp_servidor: agora,
          timestamp_cliente: dados?.timestamp_cliente,
          latencia_estimada_ms: dados?.timestamp_cliente
            ? Math.max(0, agora - dados.timestamp_cliente)
            : undefined,
        });
      });

      socket.on('disconnect', () => {
        this.limiter.removerIdentificador(socket.id);
      });
    });
  }
}
