// ==============================================================================
// Barramento Central de Eventos de Domínio (Event-Driven Architecture)
// ==============================================================================
// Desacopla features centrais de efeitos colaterais transversais
// (Auditoria, Notificações, Cache, Webhooks).
// ==============================================================================

import { EventEmitter } from 'node:events';
import type { ItemExemplo } from '../../api/exemplo/models/exemplo.model.js';

/**
 * Formal, strictly typed domain event catalog for the ecosystem.
 */
export interface EventosDoSistema {
  'exemplo:criado': {
    exemplo: ItemExemplo;
    usuarioId?: string;
    ip?: string | null;
  };
  'exemplo:atualizado': {
    exemplo: ItemExemplo;
    usuarioId?: string;
  };
  'exemplo:desativado': {
    exemploId: string;
    usuarioId?: string;
  };
}

export class AppEventBus extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(50);
  }

  /**
   * Emits a typed domain event to all registered listeners (fire-and-forget).
   *
   * @param evento - The domain event name.
   * @param dados - Typed event payload.
   * @returns True if the event had listeners, false otherwise.
   */
  emitir<K extends keyof EventosDoSistema>(evento: K, dados: EventosDoSistema[K]): boolean {
    return this.emit(evento, dados);
  }

  /**
   * Emits a typed domain event and awaits completion of all asynchronous listeners.
   * Does not propagate listener errors to preserve emitter resilience.
   *
   * @param evento - The domain event name.
   * @param dados - Typed event payload.
   * @returns Resolves when all listeners have finished executing.
   */
  async emitirAsync<K extends keyof EventosDoSistema>(evento: K, dados: EventosDoSistema[K]): Promise<void> {
    const ouvintes = this.listeners(evento);
    await Promise.all(
      ouvintes.map((ouvinte) => {
        try {
          return Promise.resolve(ouvinte(dados)).catch(() => undefined);
        } catch {
          return Promise.resolve();
        }
      })
    );
  }

  /**
   * Registers a listener callback for a specific typed domain event.
   *
   * @param evento - The domain event name.
   * @param ouvinte - Callback function handling the event data.
   * @returns EventBus instance for chaining.
   */
  ouvir<K extends keyof EventosDoSistema>(
    evento: K,
    ouvinte: (dados: EventosDoSistema[K]) => void | Promise<void>
  ): this {
    return this.on(evento, ouvinte);
  }

  /**
   * Removes a previously registered listener callback for a domain event.
   *
   * @param evento - The domain event name.
   * @param ouvinte - Callback function to unregister.
   * @returns EventBus instance for chaining.
   */
  removerOuvinte<K extends keyof EventosDoSistema>(
    evento: K,
    ouvinte: (dados: EventosDoSistema[K]) => void | Promise<void>
  ): this {
    return this.off(evento, ouvinte);
  }
}

/**
 * Global singleton instance of the application Domain Event Bus.
 */
export const eventBus = new AppEventBus();
