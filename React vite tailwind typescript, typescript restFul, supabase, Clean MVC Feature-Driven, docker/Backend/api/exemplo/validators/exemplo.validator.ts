import type { CriarExemploDTO, AtualizarExemploDTO, CategoriaExemplo } from '../dtos/exemplo.dto.js';

const CATEGORIAS_PERMITIDAS: readonly CategoriaExemplo[] = [
  'geral',
  'arquitetura',
  'frontend',
  'backend',
  'banco',
];

export interface ResultadoValidacao<T> {
  valido: boolean;
  erros: string[];
  dados?: T;
}

/**
 * Validates the payload for creating a new example item (POST /api/exemplo).
 *
 * @param payload - Raw request body received by the controller.
 * @returns Validation result with sanitized DTO or descriptive error messages.
 */
export function validarCriarExemploDTO(payload: unknown): ResultadoValidacao<CriarExemploDTO> {
  const erros: string[] = [];
  if (!payload || typeof payload !== 'object') {
    return { valido: false, erros: ['Payload JSON inválido.'] };
  }

  const raw = payload as Record<string, unknown>;
  const nome = typeof raw.nome === 'string' ? raw.nome.trim() : '';

  if (nome.length < 2) {
    erros.push('O campo "nome" é obrigatório e deve ter pelo menos 2 caracteres.');
  } else if (nome.length > 160) {
    erros.push('O campo "nome" deve ter no máximo 160 caracteres.');
  }

  let descricao: string | undefined;
  if (raw.descricao !== undefined && raw.descricao !== null) {
    if (typeof raw.descricao !== 'string') {
      erros.push('O campo "descricao" deve ser um texto.');
    } else {
      descricao = raw.descricao.trim();
    }
  }

  let categoria: CategoriaExemplo = 'geral';
  if (raw.categoria !== undefined && raw.categoria !== null && raw.categoria !== '') {
    if (
      typeof raw.categoria !== 'string' ||
      !CATEGORIAS_PERMITIDAS.includes(raw.categoria as CategoriaExemplo)
    ) {
      erros.push(
        `Categoria inválida. Valores permitidos: ${CATEGORIAS_PERMITIDAS.join(', ')}.`
      );
    } else {
      categoria = raw.categoria as CategoriaExemplo;
    }
  }

  if (erros.length > 0) {
    return { valido: false, erros };
  }

  return {
    valido: true,
    erros: [],
    dados: {
      nome,
      descricao,
      categoria,
    },
  };
}

/**
 * Validates partial update payload for an existing example item (PUT /api/exemplo/:id).
 *
 * @param payload - Raw request body received by the controller.
 * @returns Validation result with sanitized partial DTO or descriptive error messages.
 */
export function validarAtualizarExemploDTO(payload: unknown): ResultadoValidacao<AtualizarExemploDTO> {
  const erros: string[] = [];
  if (!payload || typeof payload !== 'object') {
    return { valido: false, erros: ['Payload JSON inválido.'] };
  }

  const raw = payload as Record<string, unknown>;
  const dados: AtualizarExemploDTO = {};

  if (raw.nome !== undefined) {
    if (typeof raw.nome !== 'string' || raw.nome.trim().length < 2) {
      erros.push('O campo "nome" deve conter ao menos 2 caracteres.');
    } else {
      dados.nome = raw.nome.trim();
    }
  }

  if (raw.descricao !== undefined) {
    if (typeof raw.descricao !== 'string') {
      erros.push('O campo "descricao" deve ser um texto.');
    } else {
      dados.descricao = raw.descricao.trim();
    }
  }

  if (raw.categoria !== undefined) {
    if (
      typeof raw.categoria !== 'string' ||
      !CATEGORIAS_PERMITIDAS.includes(raw.categoria as CategoriaExemplo)
    ) {
      erros.push(
        `Categoria inválida. Valores permitidos: ${CATEGORIAS_PERMITIDAS.join(', ')}.`
      );
    } else {
      dados.categoria = raw.categoria as CategoriaExemplo;
    }
  }

  if (erros.length > 0) {
    return { valido: false, erros };
  }

  return { valido: true, erros: [], dados };
}
