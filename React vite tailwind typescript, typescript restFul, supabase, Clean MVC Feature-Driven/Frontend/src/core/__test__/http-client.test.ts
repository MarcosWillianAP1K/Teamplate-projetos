import { describe, it, expect } from "vitest";
import { ENDPOINTS, withFallback, safeRequest } from "@/core/api";
import { USUARIO_PADRAO_MOCK } from "@/shared/types";

describe("Core API: ENDPOINTS, withFallback e Fixtures Base", () => {
  it("deve expor os endpoints canônicos de EXEMPLO", () => {
    expect(ENDPOINTS.EXEMPLO.BASE).toBe("/exemplo");
    expect(ENDPOINTS.EXEMPLO.BY_ID("123")).toBe("/exemplo/123");
    expect(ENDPOINTS.EXEMPLO.REATIVAR("123")).toBe("/exemplo/123/reativar");
    expect(ENDPOINTS.EXEMPLO.HARD_DELETE("123")).toBe("/exemplo/123/hard");
  });

  it("deve retornar o fallback em modo de teste quando não há spy ativo no HttpClient", async () => {
    const resultado = await withFallback(
      async () => ({ origem: "api" }),
      () => ({ origem: "fallback" }),
    );
    expect(resultado.origem).toBe("fallback");
  });

  it("safeRequest deve usar fallback em caso de falha durante execução em modo de teste", async () => {
    const resultado = await safeRequest(
      async () => {
        throw new Error("Sem servidor na porta 3000");
      },
      () => USUARIO_PADRAO_MOCK,
    );
    expect(resultado.id).toBe(USUARIO_PADRAO_MOCK.id);
    expect(resultado.nome).toBe("Desenvolvedor Fullstack");
  });
});
