import type { Request, Response } from 'express';
import { ExemploService } from '../services/exemplo.service.js';
import {
  validarCriarExemploDTO,
  validarAtualizarExemploDTO,
} from '../validators/exemplo.validator.js';

/**
 * ==============================================================================
 * Controller: Thin Controller da Feature Exemplo
 * Segue estritamente o Envelope Pattern:
 *   { data: { exemplo | exemplos, meta? }, message: "..." }
 * Métodos obrigatoriamente em camelCase.
 * ==============================================================================
 */
export class ExemploController {
  /**
   * Handles GET /api/exemplo to list example items with pagination and filters.
   *
   * @param req - Express request with optional query filters (`busca`, `categoria`, `page`, `limit`).
   * @param res - Express response returning categorized envelope `{ data: { exemplos, meta }, message }`.
   */
  static async listar(req: Request, res: Response): Promise<void> {
    try {
      const busca = typeof req.query.busca === 'string' ? req.query.busca : undefined;
      const categoria = typeof req.query.categoria === 'string' ? req.query.categoria : undefined;
      const incluirInativos = req.query.incluirInativos === 'true';
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 20;

      const resultado = await ExemploService.listar({
        busca,
        categoria,
        incluirInativos,
        page,
        limit,
      });

      res.status(200).json({
        data: {
          exemplos: resultado.exemplos,
          meta: resultado.meta,
        },
        message: 'Itens de exemplo listados com sucesso.',
      });
    } catch {
      res.status(500).json({ error: 'Erro interno ao listar itens de exemplo.' });
    }
  }

  /**
   * Handles GET /api/exemplo/:id to retrieve a single example item by ID.
   *
   * @param req - Express request containing `:id` route parameter.
   * @param res - Express response returning `{ data: { exemplo }, message }` or 404.
   */
  static async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const exemplo = await ExemploService.buscarPorId(id);

      if (!exemplo) {
        res.status(404).json({ error: 'Item de exemplo não encontrado.' });
        return;
      }

      res.status(200).json({
        data: {
          exemplo,
        },
        message: 'Item de exemplo recuperado com sucesso.',
      });
    } catch {
      res.status(500).json({ error: 'Erro interno ao buscar item de exemplo.' });
    }
  }

  /**
   * Handles POST /api/exemplo to create a new example item.
   *
   * @param req - Express request containing `nome`, `descricao`, and `categoria` in body.
   * @param res - Express response returning status 201 with `{ data: { exemplo }, message }`.
   */
  static async criar(req: Request, res: Response): Promise<void> {
    try {
      const validacao = validarCriarExemploDTO(req.body);
      if (!validacao.valido || !validacao.dados) {
        res.status(400).json({
          error: validacao.erros[0] || 'Dados inválidos para criação.',
          detalhes: validacao.erros,
        });
        return;
      }

      const exemplo = await ExemploService.criar(validacao.dados);
      res.status(201).json({
        data: {
          exemplo,
        },
        message: 'Item de exemplo criado com sucesso.',
      });
    } catch {
      res.status(500).json({ error: 'Erro interno ao criar item de exemplo.' });
    }
  }

  /**
   * Handles PUT /api/exemplo/:id to update an existing example item.
   *
   * @param req - Express request containing `:id` and update fields in body.
   * @param res - Express response returning `{ data: { exemplo }, message }` or 404.
   */
  static async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const validacao = validarAtualizarExemploDTO(req.body);
      if (!validacao.valido || !validacao.dados) {
        res.status(400).json({
          error: validacao.erros[0] || 'Dados inválidos para atualização.',
          detalhes: validacao.erros,
        });
        return;
      }

      const exemplo = await ExemploService.atualizar(id, validacao.dados);
      if (!exemplo) {
        res.status(404).json({ error: 'Item de exemplo não encontrado.' });
        return;
      }

      res.status(200).json({
        data: {
          exemplo,
        },
        message: 'Item de exemplo atualizado com sucesso.',
      });
    } catch {
      res.status(500).json({ error: 'Erro interno ao atualizar item de exemplo.' });
    }
  }

  /**
   * Handles DELETE /api/exemplo/:id to perform logical soft delete (`status_ativo = false`).
   *
   * @param req - Express request containing `:id`.
   * @param res - Express response returning `{ data: { exemplo }, message }`.
   */
  static async desativar(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const exemplo = await ExemploService.desativar(id);

      if (!exemplo) {
        res.status(404).json({ error: 'Item de exemplo não encontrado.' });
        return;
      }

      res.status(200).json({
        data: {
          exemplo,
        },
        message: 'Item de exemplo desativado com sucesso (Soft Delete).',
      });
    } catch {
      res.status(500).json({ error: 'Erro interno ao desativar item de exemplo.' });
    }
  }

  /**
   * Handles PATCH /api/exemplo/:id/reativar to restore a soft-deleted example item.
   *
   * @param req - Express request containing `:id`.
   * @param res - Express response returning `{ data: { exemplo }, message }`.
   */
  static async reativar(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const exemplo = await ExemploService.reativar(id);

      if (!exemplo) {
        res.status(404).json({ error: 'Item de exemplo não encontrado.' });
        return;
      }

      res.status(200).json({
        data: {
          exemplo,
        },
        message: 'Item de exemplo reativado com sucesso.',
      });
    } catch {
      res.status(500).json({ error: 'Erro interno ao reativar item de exemplo.' });
    }
  }

  /**
   * Handles DELETE /api/exemplo/:id/hard to permanently delete an item.
   *
   * @param req - Express request containing `:id`.
   * @param res - Express response returning 200 OK or 404.
   */
  static async deletarHard(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const removido = await ExemploService.deletarHard(id);

      if (!removido) {
        res.status(404).json({ error: 'Item de exemplo não encontrado.' });
        return;
      }

      res.status(200).json({
        data: {
          removido: { id },
        },
        message: 'Item de exemplo removido permanentemente.',
      });
    } catch {
      res.status(500).json({ error: 'Erro interno ao remover item de exemplo.' });
    }
  }
}
