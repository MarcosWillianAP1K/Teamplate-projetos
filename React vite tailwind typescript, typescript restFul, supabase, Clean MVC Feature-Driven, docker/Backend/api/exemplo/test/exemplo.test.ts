import { describe, it, expect, beforeEach } from 'vitest';
import { ExemploModel } from '../models/exemplo.model.js';
import { ExemploService } from '../services/exemplo.service.js';
import {
  validarCriarExemploDTO,
  validarAtualizarExemploDTO,
} from '../validators/exemplo.validator.js';

describe('Backend: Feature Exemplo (Clean MVC + Service + Validator)', () => {
  beforeEach(() => {
    ExemploModel.resetarMemoria();
  });

  it('deve listar itens iniciais ativos com metadados de paginação', async () => {
    const resultado = await ExemploService.listar();
    expect(resultado.exemplos).toBeInstanceOf(Array);
    expect(resultado.exemplos.length).toBe(2);
    expect(resultado.meta.total).toBe(2);
    expect(resultado.meta.pagina).toBe(1);
  });

  it('deve validar corretamente o DTO de criação e rejeitar nomes curtos', () => {
    const invalido = validarCriarExemploDTO({ nome: 'A' });
    expect(invalido.valido).toBe(false);
    expect(invalido.erros.length).toBeGreaterThan(0);

    const valido = validarCriarExemploDTO({
      nome: 'Novo Módulo REST',
      descricao: 'Teste de validação estrita',
      categoria: 'backend',
    });
    expect(valido.valido).toBe(true);
    expect(valido.dados?.categoria).toBe('backend');
  });

  it('deve criar, buscar por ID, atualizar, desativar (soft delete) e reativar um item', async () => {
    const criado = await ExemploService.criar({
      nome: 'Item Ciclo Completo',
      descricao: 'Descrição inicial',
      categoria: 'arquitetura',
    });

    expect(criado.id).toBeDefined();
    expect(criado.status_ativo).toBe(true);

    const buscado = await ExemploService.buscarPorId(criado.id);
    expect(buscado?.nome).toBe('Item Ciclo Completo');

    const validacaoUpdate = validarAtualizarExemploDTO({
      nome: 'Item Ciclo Atualizado',
    });
    expect(validacaoUpdate.valido).toBe(true);

    const atualizado = await ExemploService.atualizar(criado.id, validacaoUpdate.dados!);
    expect(atualizado?.nome).toBe('Item Ciclo Atualizado');

    // Soft delete
    const desativado = await ExemploService.desativar(criado.id);
    expect(desativado?.status_ativo).toBe(false);

    const listagemAtivos = await ExemploService.listar();
    expect(listagemAtivos.exemplos.some((i) => i.id === criado.id)).toBe(false);

    // Reativar
    const reativado = await ExemploService.reativar(criado.id);
    expect(reativado?.status_ativo).toBe(true);
  });
});
