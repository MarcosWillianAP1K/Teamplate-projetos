/**
 * ==============================================================================
 * UTILITÁRIOS DE VALIDAÇÃO GERAIS (Core)
 * ==============================================================================
 * Funções puras reutilizáveis para validação de formatos comuns:
 * - UUID canônico (v1-v5)
 * - CPF (Módulo 11)
 * - CEP brasileiro
 * - Telefone celular brasileiro
 */

export function validarUUID(id: string | null | undefined): boolean {
  if (!id || typeof id !== 'string') return false;
  const regexUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regexUUID.test(id.trim());
}

export function validarCPF(cpf: string): boolean {
  if (!cpf || typeof cpf !== 'string') return false;

  const limpo = cpf.replace(/\D/g, '');
  if (limpo.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(limpo)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(limpo.charAt(i), 10) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(limpo.charAt(9), 10)) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(limpo.charAt(i), 10) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(limpo.charAt(10), 10)) return false;

  return true;
}

export function validarCEP(cep: string): boolean {
  if (!cep || typeof cep !== 'string') return false;
  const limpo = cep.replace(/\D/g, '');
  return limpo.length === 8;
}

export function validarTelefone(telefone: string): boolean {
  if (!telefone || typeof telefone !== 'string') return false;

  const digitos = telefone.replace(/\D/g, '');

  if (digitos.length === 13) {
    return /^55[1-9]{2}9\d{8}$/.test(digitos);
  }

  if (digitos.length === 11) {
    return /^[1-9]{2}9\d{8}$/.test(digitos);
  }

  return false;
}
