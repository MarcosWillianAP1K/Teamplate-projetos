# Roteiro de Testes e Homologação de Features

> **Objetivo:** Estabelecer o protocolo de validação manual e automatizada para garantir que qualquer entrega de código esteja 100% aderente aos critérios de aceite definidos nos cards de tarefa.

---

## 1. Quality Gate Automatizado

Antes de realizar testes manuais ou abrir pull request, execute:

```bash
# 1. Validação estrita de tipos TypeScript (deve retornar 0 erros)
npm run typecheck

# 2. Execução da suíte completa de testes no Vitest (100% de testes verdes)
npm test
```

---

## 2. Roteiro de Testes Manuais Ponta a Ponta

### CT01: Listagem Inicial de Itens
* **Pré-condição:** Backend rodando na porta 3000 e Frontend na porta 5173.
* **Passos:**
  1. Acesse `http://localhost:5173/exemplo`.
  2. Observe a renderização da tabela ou grid de itens.
* **Resultado Esperado:** Os 2 itens iniciais de seed devem ser renderizados na tela, com badges de categoria e status ativo verde.

### CT02: Criação de Novo Registro
* **Passos:**
  1. Clique no botão **"Novo Registro"** no canto superior direito.
  2. Preencha o campo "Nome" (mínimo 3 caracteres) e selecione uma categoria.
  3. Clique em **"Salvar"**.
* **Resultado Esperado:** O modal fecha, o item recém-criado surge no topo da lista e uma notificação de sucesso é exibida. O Backend registra HTTP `201 Created` no terminal.

### CT03: Exclusão Lógica (Soft Delete) e Reativação
* **Passos:**
  1. No card do item, clique no ícone de opções e selecione **"Desativar"**.
  2. Confirme a ação no diálogo de confirmação.
* **Resultado Esperado:** O item é marcado com `status_ativo = false`. Ao recarregar a tela sem o filtro "Incluir inativos", o item deixa de ser exibido. No banco, o registro permanece intacto com status inativo.
