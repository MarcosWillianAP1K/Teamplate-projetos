import { describe, it, expect } from 'vitest';
import {
  validarCPF,
  validarCEP,
  validarUUID,
  validarTelefone,
} from '../utils/validators.js';

describe('Core Utils: Validações (validators.ts)', () => {
  describe('validarUUID', () => {
    it('deve aceitar UUIDs válidos (v4 e padrão)', () => {
      expect(validarUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
      expect(validarUUID('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11')).toBe(true);
    });

    it('deve rejeitar strings que não sejam UUIDs válidos', () => {
      expect(validarUUID('123')).toBe(false);
      expect(validarUUID('not-a-uuid')).toBe(false);
      expect(validarUUID('')).toBe(false);
      expect(validarUUID(null)).toBe(false);
    });
  });

  describe('validarCPF (Algoritmo Módulo 11)', () => {
    it('deve validar CPFs autênticos com e sem pontuação', () => {
      expect(validarCPF('529.982.247-25')).toBe(true);
      expect(validarCPF('52998224725')).toBe(true);
    });

    it('deve rejeitar CPFs inválidos ou sequências repetidas', () => {
      expect(validarCPF('123.456.789-00')).toBe(false);
      expect(validarCPF('000.000.000-00')).toBe(false);
      expect(validarCPF('')).toBe(false);
    });
  });

  describe('validarCEP', () => {
    it('deve aceitar CEPs válidos com e sem hífen', () => {
      expect(validarCEP('01310-100')).toBe(true);
      expect(validarCEP('01310100')).toBe(true);
    });

    it('deve rejeitar CEPs inválidos', () => {
      expect(validarCEP('123')).toBe(false);
      expect(validarCEP('')).toBe(false);
    });
  });

  describe('validarTelefone', () => {
    it('deve aceitar celulares válidos com DDD e dígito 9', () => {
      expect(validarTelefone('+55 (11) 98765-4321')).toBe(true);
      expect(validarTelefone('11987654321')).toBe(true);
    });

    it('deve rejeitar telefones inválidos', () => {
      expect(validarTelefone('11887654321')).toBe(false);
      expect(validarTelefone('')).toBe(false);
    });
  });
});
