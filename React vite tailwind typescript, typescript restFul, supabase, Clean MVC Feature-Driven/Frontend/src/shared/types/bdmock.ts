export interface UsuarioMock {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  registro?: string;
}

export const USUARIO_PADRAO_MOCK: UsuarioMock = {
  id: "00000000-0000-4000-8000-000000000001",
  nome: "Desenvolvedor Fullstack",
  email: "dev@template.local",
  cargo: "Engenharia de Software",
  registro: "DEV-001",
};
