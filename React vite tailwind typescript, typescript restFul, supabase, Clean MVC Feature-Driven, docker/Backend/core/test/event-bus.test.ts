import { describe, it, expect, vi } from 'vitest';
import { AppEventBus } from '../events/event-bus.js';

describe('Core: AppEventBus (Event-Driven Architecture)', () => {
  it('deve emitir e escutar um evento tipado de forma síncrona', () => {
    const bus = new AppEventBus();
    const spy = vi.fn();

    bus.ouvir('exemplo:desativado', spy);
    bus.emitir('exemplo:desativado', {
      exemploId: '11111111-1111-4111-8111-111111111111',
      usuarioId: 'user-1',
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      exemploId: '11111111-1111-4111-8111-111111111111',
      usuarioId: 'user-1',
    });
  });

  it('deve aguardar ouvintes assíncronos no emitirAsync sem propagar falhas isoladas', async () => {
    const bus = new AppEventBus();
    const ordem: string[] = [];

    bus.ouvir('exemplo:desativado', async () => {
      await new Promise((r) => setTimeout(r, 10));
      ordem.push('ouvinte-ok');
    });

    bus.ouvir('exemplo:desativado', async () => {
      throw new Error('Falha isolada no listener secundário');
    });

    await expect(
      bus.emitirAsync('exemplo:desativado', { exemploId: 'id-teste' })
    ).resolves.toBeUndefined();

    expect(ordem).toContain('ouvinte-ok');
  });
});
