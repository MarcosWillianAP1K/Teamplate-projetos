import { Router } from 'express';
import { ExemploController } from '../controllers/exemplo.controller.js';

/**
 * ==============================================================================
 * Rotas: Endpoints REST da Feature Exemplo (/api/exemplo)
 * ==============================================================================
 * Define os mapeamentos de URL HTTP para os métodos correspondentes do Controller.
 * As anotações JSDoc (@swagger) alimentam automaticamente a UI do Swagger em /api/docs.
 * ==============================================================================
 */
export const exemploRoutes = Router();

/**
 * @swagger
 * /api/exemplo:
 *   get:
 *     summary: Lista itens de exemplo
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
 *         description: Filtro de categoria
 *     responses:
 *       200:
 *         description: Lista de itens retornada no Envelope Pattern
 */
exemploRoutes.get('/', ExemploController.listar);

/**
 * @swagger
 * /api/exemplo/{id}:
 *   get:
 *     summary: Busca item de exemplo por ID
 *     tags: [Exemplo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item encontrado
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               categoria:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
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
