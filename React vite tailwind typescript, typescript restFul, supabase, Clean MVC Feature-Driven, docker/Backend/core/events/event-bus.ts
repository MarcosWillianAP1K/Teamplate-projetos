/**
 * ============================================================================
 * CORE EVENTS — BARRAMENTO DE EVENTOS (Event Bus)
 * ============================================================================
 * Este arquivo fornece um barramento de eventos simples em memória baseado no
 * `EventEmitter` nativo do Node.js.
 *
 * PARA QUE SERVE:
 * - Desacoplar regras de negócio entre módulos diferentes.
 * - Por exemplo: quando um novo usuário se cadastrar ou um pedido for criado,
 *   o service dispara `eventBus.emit('usuario:cadastrado', dados)`.
 * - Outro módulo (ex: envio de e-mails, auditoria de logs, push notifications)
 *   escuta o evento com `eventBus.on('usuario:cadastrado', ...)` sem que um
 *   módulo precise conhecer o outro diretamente.
 * ============================================================================
 */

import { EventEmitter } from 'node:events';

class SimpleEventBus extends EventEmitter {
  constructor() {
    super();
    // Permite múltiplos ouvintes sem emitir warning prematuro
    this.setMaxListeners(20);
  }
}

export const eventBus = new SimpleEventBus();
export default eventBus;
