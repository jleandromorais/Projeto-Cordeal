import React from 'react';
import { Outlet } from 'react-router-dom';
// CORREÇÃO: Adicionando a extensão .tsx ao caminho da importação
import Header from './Header.tsx'; // O header da página inicial

// Este componente irá "envolver" as páginas que compartilham o mesmo cabeçalho
const MainLayout: React.FC = () => {
  return (
    <>
      {/* O Header é renderizado aqui, no topo */}
      <Header />
      
      {/* <Outlet /> é um espaço reservado onde o react-router irá 
          injetar a página filha (seja a PagInit ou a PagCadastro) */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;

