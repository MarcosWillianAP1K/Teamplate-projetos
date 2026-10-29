import { Router } from 'express';
import { ExemploController } from '../controllers/exemplo.controller.js';

/**
 * ==============================================================================
 * Routes: Endpoints REST da Feature Exemplo (/api/exemplo)
 * Convenção: Recurso no singular e sub-ações semânticas no final da URI.
 * ==============================================================================
 */
export const exemploRoutes = Router();

/**
 * @swagger
 * /api/exemplo:
 *   get:
 *     summary: Lista os itens de exemplo com suporte a busca e filtro de categoria
 *     tags: [Exemplo]
 *     parameters:
 *       - in: query
 *         name: busca
 *         schema:
 *           type: string
 *         description: Termo de busca por nome ou descrição
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Filtro por categoria (geral, arquitetura, frontend, backend, banco)
 *     responses:
 *       200:
 *         description: Lista de itens de exemplo retornada no formato Envelope Pattern
 */
exemploRoutes.get('/', ExemploController.listar);

/**
 * @swagger
 * /api/exemplo/{id}:
 *   get:
 *     summary: Busca um item de exemplo pelo ID
 *     tags: [Exemplo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item de exemplo encontrado
 *       404:
 *         description: Item não encontrado
 */
exemploRoutes.get('/:id', ExemploController.buscarPorId);

/**
 * @swagger
 * /api/exemplo:
 *   post:
 *     summary: Cria um novo item de exemplo
 *     tags: [Exemplo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome]
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               categoria:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 *       400:
 *         description: Dados de entrada inválidos
 */
exemploRoutes.post('/', ExemploController.criar);

/**
 * @swagger
 * /api/exemplo/{id}:
 *   put:
 *     summary: Atualiza um item de exemplo existente
 *     tags: [Exemplo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *       404:
 *         description: Item não encontrado
 */
exemploRoutes.put('/:id', ExemploController.atualizar);

/**
 * @swagger
 * /api/exemplo/{id}:
 *   delete:
 *     summary: Desativa logicamente um item de exemplo (Soft Delete)
 *     tags: [Exemplo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item desativado com sucesso
 */
exemploRoutes.delete('/:id', ExemploController.desativar);

/**
 * @swagger
 * /api/exemplo/{id}/reativar:
 *   patch:
 *     summary: Reativa um item de exemplo desativado
 *     tags: [Exemplo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item reativado com sucesso
 */
exemploRoutes.patch('/:id/reativar', ExemploController.reativar);

/**
 * @swagger
 * /api/exemplo/{id}/hard:
 *   delete:
 *     summary: Remove permanentemente um item de exemplo (Hard Delete)
 *     tags: [Exemplo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item excluído permanentemente
 */
exemploRoutes.delete('/:id/hard', ExemploController.deletarHard);
