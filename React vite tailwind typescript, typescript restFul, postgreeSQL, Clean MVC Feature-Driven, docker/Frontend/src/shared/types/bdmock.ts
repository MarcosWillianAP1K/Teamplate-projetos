/**
 * ============================================================================
 * BANCO MOCK EM MEMÓRIA / FIXTURES (Frontend Shared)
 * ============================================================================
 * PARA QUE SERVE:
 * - Permite testar telas, componentes e protótipos de frontend mesmo sem o Backend
 *   ou o banco de dados estar rodando localmente (desenvolvimento offline/mock).
 * - Fornece dados iniciais fictícios para testes unitários ou stories.
 * ============================================================================
 */

export interface UsuarioMock {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  registro: string;
}

export const USUARIO_PADRAO_MOCK: UsuarioMock = {
  id: "00000000-0000-4000-a000-000000000001",
  nome: "Usuário Exemplo",
  email: "dev@exemplo.com",
  cargo: "Desenvolvedor Fullstack",
  registro: "DEV-001",
};

export const ITENS_EXEMPLO_MOCK = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    nome: "Exemplo de Integração Frontend & Backend",
    descricao: "Card demonstrativo carregado do mock de desenvolvimento.",
    categoria: "arquitetura",
    status_ativo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    nome: "Configuração do Tailwind v4 e React 19",
    descricao: "Design system com shadcn UI e suporte a temas.",
    categoria: "frontend",
    status_ativo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
