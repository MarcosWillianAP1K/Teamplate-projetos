import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * Layout principal da aplicação.
 * Funciona como moldura estrutural compartilhada entre as páginas.
 */
export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Topbar / Header simples */}
      <header className="border-b bg-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-800">Template Starter</h1>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
          Layout Base
        </span>
      </header>

      {/* Conteúdo dinâmico das rotas filhas */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6">
        <Outlet />
      </main>

      {/* Footer simples */}
      <footer className="border-t bg-white px-6 py-3 text-center text-xs text-slate-400">
        Template de Estrutura de Projeto
      </footer>
    </div>
  );
};

export default MainLayout;
