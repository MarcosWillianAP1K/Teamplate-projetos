import React from 'react';
import type { ItemExemplo } from '../types/exemplo.types';

export interface CardExemploProps {
  item: ItemExemplo;
}

export const CardExemplo: React.FC<CardExemploProps> = ({ item }) => {
  return (
    <div className="p-4 border border-slate-200 rounded-lg bg-white shadow-xs">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase font-semibold text-slate-400">
          {item.categoria}
        </span>
        <span className="text-xs text-emerald-600 font-medium">Ativo</span>
      </div>
      <h3 className="text-base font-bold text-slate-800 mt-2">{item.nome}</h3>
      <p className="text-sm text-slate-600 mt-1">
        {item.descricao || 'Sem descrição informada.'}
      </p>
    </div>
  );
};

export default CardExemplo;
