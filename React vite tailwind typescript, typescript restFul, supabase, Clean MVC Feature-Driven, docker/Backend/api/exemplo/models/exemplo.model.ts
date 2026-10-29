import crypto from 'node:crypto';
import type {
  CategoriaExemplo,
  CriarExemploDTO,
  AtualizarExemploDTO,
  FiltroExemploDTO,
} from '../dtos/exemplo.dto.js';

/**
 * ==============================================================================
 * Model: Estrutura de Dados e Persistência da Feature Exemplo
 * Suporta operação imediata em memória (para desenvolvimento rápido e testes)
 * e segue exatamente o schema SQL de `Database/database.sql`.
 * ==============================================================================
 */
export interface ItemExemplo {
  id: string;
  nome: string;
  descricao: string;
  categoria: CategoriaExemplo;
  status_ativo: boolean;
  created_at: string;
  updated_at: string;
}

const ITENS_INICIAIS: ItemExemplo[] = [
  {
    id: '11111111-1111-4111-8111-111111111111',
    nome: 'Item de Exemplo Arquitetura MVC',
    descricao: 'Registro demonstrativo do fluxo Controller -> Service -> Model.',
    categoria: 'arquitetura',
    status_ativo: true,
    created_at: '2026-10-29T12:00:00.000Z',
    updated_at: '2026-10-29T12:00:00.000Z',
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    nome: 'Integração Frontend React 19 + Tailwind v4',
    descricao: 'Consumo via HttpClient com Envelope Pattern e fallback resiliente para mocks.',
    categoria: 'frontend',
    status_ativo: true,
    created_at: '2026-10-29T12:05:00.000Z',
    updated_at: '2026-10-29T12:05:00.000Z',
  },
];

export class ExemploModel {
  private static items: ItemExemplo[] = structuredClone(ITENS_INICIAIS);

  /**
   * Resets the in-memory store to initial seed state (useful for deterministic automated tests).
   */
  static resetarMemoria(): void {
    this.items = structuredClone(ITENS_INICIAIS);
  }

  /**
   * Lists example items applying optional search, category, and soft-delete filters.
   *
   * @param filtros - Optional filter and pagination criteria.
   * @returns Filtered array of example items.
   */
  static async listar(filtros?: FiltroExemploDTO): Promise<ItemExemplo[]> {
    let resultado = [...this.items];

    if (!filtros?.incluirInativos) {
      resultado = resultado.filter((item) => item.status_ativo);
    }

    if (filtros?.categoria && filtros.categoria !== 'todas' && filtros.categoria !== 'all') {
      resultado = resultado.filter((item) => item.categoria === filtros.categoria);
    }

    if (filtros?.busca && filtros.busca.trim() !== '') {
      const termo = filtros.busca.trim().toLowerCase();
      resultado = resultado.filter(
        (item) =>
          item.nome.toLowerCase().includes(termo) ||
          item.descricao.toLowerCase().includes(termo)
      );
    }

    return resultado;
  }

  /**
   * Retrieves a single example item by its unique identifier.
   *
   * @param id - UUID or string identifier of the item.
   * @returns Matching item if found, or undefined otherwise.
   */
  static async buscarPorId(id: string): Promise<ItemExemplo | undefined> {
    return this.items.find((item) => item.id === id);
  }

  /**
   * Creates and persists a new example item.
   *
   * @param dto - Validated creation payload.
   * @returns Newly created example item.
   */
  static async criar(dto: CriarExemploDTO): Promise<ItemExemplo> {
    const agora = new Date().toISOString();
    const novo: ItemExemplo = {
      id: crypto.randomUUID(),
      nome: dto.nome,
      descricao: dto.descricao ?? '',
      categoria: dto.categoria ?? 'geral',
      status_ativo: true,
      created_at: agora,
      updated_at: agora,
    };
    this.items.push(novo);
    return novo;
  }

  /**
   * Updates an existing example item by ID.
   *
   * @param id - Unique identifier of the item to update.
   * @param dto - Partial update payload.
   * @returns Updated item, or undefined if not found.
   */
  static async atualizar(
    id: string,
    dto: AtualizarExemploDTO
  ): Promise<ItemExemplo | undefined> {
    const indice = this.items.findIndex((item) => item.id === id);
    if (indice === -1) return undefined;

    const atual = this.items[indice];
    const atualizado: ItemExemplo = {
      ...atual,
      nome: dto.nome ?? atual.nome,
      descricao: dto.descricao ?? atual.descricao,
      categoria: dto.categoria ?? atual.categoria,
      updated_at: new Date().toISOString(),
    };

    this.items[indice] = atualizado;
    return atualizado;
  }

  /**
   * Performs logical deletion (soft delete) by setting `status_ativo = false`.
   *
   * @param id - Unique identifier of the item to deactivate.
   * @returns Deactivated item, or undefined if not found.
   */
  static async desativar(id: string): Promise<ItemExemplo | undefined> {
    const indice = this.items.findIndex((item) => item.id === id);
    if (indice === -1) return undefined;

    this.items[indice] = {
      ...this.items[indice],
      status_ativo: false,
      updated_at: new Date().toISOString(),
    };
    return this.items[indice];
  }

  /**
   * Reactivates a logically deleted item (`status_ativo = true`).
   *
   * @param id - Unique identifier of the item to reactivate.
   * @returns Reactivated item, or undefined if not found.
   */
  static async reativar(id: string): Promise<ItemExemplo | undefined> {
    const indice = this.items.findIndex((item) => item.id === id);
    if (indice === -1) return undefined;

    this.items[indice] = {
      ...this.items[indice],
      status_ativo: true,
      updated_at: new Date().toISOString(),
    };
    return this.items[indice];
  }

  /**
   * Permanently removes an item from storage (Hard Delete — development/testing utility).
   *
   * @param id - Unique identifier of the item to remove.
   * @returns True if deleted, false if not found.
   */
  static async deletarHard(id: string): Promise<boolean> {
    const tamanhoInicial = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);
    return this.items.length < tamanhoInicial;
  }
}
