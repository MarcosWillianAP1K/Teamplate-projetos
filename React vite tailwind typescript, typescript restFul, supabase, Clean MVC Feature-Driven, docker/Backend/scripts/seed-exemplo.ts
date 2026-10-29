import { ExemploModel } from '../api/exemplo/models/exemplo.model.js';

async function executarSeed(): Promise<void> {
  console.log('[Seed] Inicializando dados da feature Exemplo...');
  ExemploModel.resetarMemoria();
  const itens = await ExemploModel.listar();
  console.log(`[Seed] Concluído com sucesso! ${itens.length} itens disponíveis.`);
}

void executarSeed();
