import React, { useEffect, useState } from 'react';
import { Button } from '@/shared/components/ui';
import { CardExemplo } from '../components/CardExemplo';
import { exemploService } from '../services/exemplo.service';
import type { ItemExemplo } from '../types/exemplo.types';

export const ExemploPage: React.FC = () => {
  const [itens, setItens] = useState<ItemExemplo[]>([]);
  const [loading, setLoading] = useState(true);

  const carregarItens = async () => {
    setLoading(true);
    const dados = await exemploService.listar();
    setItens(dados);
    setLoading(false);
  };

  useEffect(() => {
    carregarItens();
  }, []);

  return (
    <div className="space-y-6">
      {/* Bloco de Título e Ação */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Feature Exemplo</h2>
          <p className="text-sm text-slate-500">
            Estrutura base da feature (Página → Componente → Service → API).
          </p>
        </div>
        <Button onClick={carregarItens}>
          Atualizar
        </Button>
      </div>

      {/* Bloco de Conteúdo */}
      <div className="border border-slate-200 rounded-lg p-6 bg-white space-y-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Itens Cadastrados
        </h3>

        {loading ? (
          <p className="text-sm text-slate-400">Carregando itens...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {itens.map((item) => (
              <CardExemplo key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExemploPage;
