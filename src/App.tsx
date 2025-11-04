// Em src/App.tsx

import { Routes, Route, useNavigate } from 'react-router-dom';
import PagInit from './pages/PagInit';
import PagDash from './pages/PagDash';

function App() {
  // O hook useNavigate nos permite forçar a navegação
  const navigate = useNavigate();

  // 1. Esta função será passada para PagInit
  //    Quando o usuário logar, ela será chamada e o levará ao dashboard
  const handleLogin = (role: string) => {
    console.log(`Usuário logado como: ${role}`);
    navigate('/dashboard'); // Redireciona para a página do dashboard
  };

  // 2. Esta função será passada para PagDash
  //    Quando o usuário clicar em "Sair", ela será chamada e o levará para a home
  const handleLogout = () => {
    console.log('Usuário deslogado');
    navigate('/'); // Redireciona para a página inicial
  };

  return (
    // O <Routes> define a área onde as páginas serão trocadas
    <Routes>
      {/* Rota 1: A página inicial (path="/") */}
      <Route 
        path="/" 
        element={<PagInit onLogin={handleLogin} />} 
      />
      
      {/* Rota 2: A página do dashboard (path="/dashboard") */}
      <Route 
        path="/dashboard" 
        element={<PagDash onLogout={handleLogout} />} 
      />

      {/* Você pode adicionar outras rotas aqui, como /cadastro, /perfil, etc. */}
    </Routes>
  );
}

export default App;