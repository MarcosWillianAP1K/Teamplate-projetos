import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { SocketRateLimiter, type ResultadoRateLimit } from '../websocket/socket.limiter.js';

describe('Core WebSocket: Rate Limiting e Prevenção de Flood', () => {
  let limiter: SocketRateLimiter;

  beforeEach(() => {
    limiter = new SocketRateLimiter({
      maxEventosPorJanela: 5,
      janelaMs: 100,
    });
  });

  afterEach(() => {
    limiter.limparTodos();
  });

  it('deve permitir eventos dentro do limite configurado', () => {
    for (let i = 1; i <= 5; i++) {
      const resultado: ResultadoRateLimit = limiter.verificarLimite('socket_1', 'evento_teste');
      expect(resultado.permitido).toBe(true);
      expect(resultado.totalEventosNaJanela).toBe(i);
      expect(resultado.limiteMaximo).toBe(5);
    }
  });

  it('deve bloquear eventos quando a taxa máxima for excedida', () => {
    for (let i = 0; i < 5; i++) {
      limiter.verificarLimite('socket_1', 'evento_teste');
    }

    const resultadoBloqueado = limiter.verificarLimite('socket_1', 'evento_teste');
    expect(resultadoBloqueado.permitido).toBe(false);
    expect(resultadoBloqueado.codigo).toBe('RATE_LIMIT_EXCEDIDO');
    expect(resultadoBloqueado.mensagem).toContain('5 eventos por segundo');
    expect(resultadoBloqueado.tempoRestanteMs).toBeGreaterThanOrEqual(0);
  });

  it('deve permitir novos eventos após o tempo da janela expirar (janela deslizante)', async () => {
    for (let i = 0; i < 5; i++) {
      limiter.verificarLimite('socket_1', 'evento_teste');
    }

    expect(limiter.verificarLimite('socket_1', 'evento_teste').permitido).toBe(false);

    await new Promise((r) => setTimeout(r, 110));

    const novoResultado = limiter.verificarLimite('socket_1', 'evento_teste');
    expect(novoResultado.permitido).toBe(true);
  });

  it('deve manter limites independentes por socket sem interferência cruzada', () => {
    for (let i = 0; i < 5; i++) {
      limiter.verificarLimite('socket_A', 'evento_teste');
    }

    expect(limiter.verificarLimite('socket_A', 'evento_teste').permitido).toBe(false);
    expect(limiter.verificarLimite('socket_B', 'evento_teste').permitido).toBe(true);
  });

  it('deve limpar registros de um socket desconectado', () => {
    limiter.verificarLimite('socket_1', 'evento_teste');
    limiter.removerIdentificador('socket_1');

    const res = limiter.verificarLimite('socket_1', 'evento_teste');
    expect(res.totalEventosNaJanela).toBe(1);
  });
});
