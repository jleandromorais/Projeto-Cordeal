import React from 'react';
import { Outlet } from 'react-router-dom';
// CORREÇÃO: O caminho correto para o Header (que está em Components)
import Header from '../Components/Header.tsx'; // O header da página inicial

// Este componente irá "envolver" as páginas que compartilham o mesmo cabeçalho
const MainLayout: React.FC = () => {
  return (
    <>
      {/* O Header é renderizado aqui, no topo */}
      <Header />
      
      {/* <Outlet /> é onde o react-router irá injetar a página 
         (PagInit ou PagCadastro) */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
