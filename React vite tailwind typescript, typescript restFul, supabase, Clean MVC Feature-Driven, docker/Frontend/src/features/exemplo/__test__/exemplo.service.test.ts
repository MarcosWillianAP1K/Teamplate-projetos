import { describe, it, expect, beforeEach } from "vitest";
import { exemploService } from "../services/exemplo.service";
import { resetarExemplosMock } from "../types/bdmock";

describe("Frontend: exemploService (Integração & Mock Fallback)", () => {
  beforeEach(() => {
    resetarExemplosMock();
  });

  it("deve listar os itens de exemplo iniciais", async () => {
    const lista = await exemploService.listar();
    expect(Array.isArray(lista)).toBe(true);
    expect(lista.length).toBe(2);
    expect(lista[0].nome).toContain("Arquitetura MVC");
  });

  it("deve buscar um item existente pelo ID", async () => {
    const item = await exemploService.buscarPorId(
      "11111111-1111-4111-8111-111111111111",
    );
    expect(item).not.toBeNull();
    expect(item?.categoria).toBe("arquitetura");
  });

  it("deve criar e desativar um item de exemplo", async () => {
    const novo = await exemploService.criar({
      nome: "Novo Card de Teste",
      descricao: "Criado via suíte Vitest",
      categoria: "frontend",
    });

    expect(novo.id).toBeDefined();
    expect(novo.nome).toBe("Novo Card de Teste");

    const desativado = await exemploService.desativar(novo.id);
    expect(desativado?.status_ativo).toBe(false);
  });
});
