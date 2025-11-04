import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';

// Importando as Páginas (com caminhos relativos)
import PagInit from './pages/PagInit.tsx';
import PagDash from './pages/PagDash.tsx';
import PagCadastro from './pages/PagCadastro.tsx';
import PagLogin from './pages/PagLogin.tsx'; 

// Importando o Layout e o Header
import Header from './Components/Header.tsx'; 
import MainLayout from './pages/MainLayout.tsx';

function App() {
  const navigate = useNavigate();

  // Esta função agora é usada apenas pela PagLogin
  const handleLogin = (role: string) => {
    console.log(`Usuário logado como: ${role}`);
    navigate('/dashboard'); 
  };

  const handleLogout = () => {
    console.log('Usuário deslogado');
    navigate('/');
  };

  return (
    <Routes>
      {/* Rota 1: Páginas com o Header principal */}
      <Route path="/" element={<MainLayout />}>
        <Route 
          index
          // ✅ CORREÇÃO: Removida a prop onLogin daqui
          element={<PagInit />} 
        />
        <Route 
          path="cadastro"
          element={<PagCadastro />} 
        />
      </Route>

      {/* Rota 2: Dashboard (Layout Próprio) */}
      <Route 
        path="/dashboard" 
        element={<PagDash onLogout={handleLogout} />} 
      />

      {/* Rota 3: Login (Layout Próprio) */}
      <Route 
        path="/login"
        element={<PagLogin onLogin={handleLogin} />}
      />
    </Routes>
  );
}

export default App;

