// src/App.tsx (Versão final)
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Importando as Páginas
import PagInit from './pages/PagInit.tsx';
import PagDash from './pages/PagDash.tsx';
import PagCadastro from './pages/PagCadastro.tsx';
import PagLogin from './pages/PagLogin.tsx'; 

// Importando Layouts e Rotas Protegidas
import Header from './Components/Header.tsx'; 
import MainLayout from './pages/MainLayout.tsx';
import ProtectedRoute from './ProtectedRoute.tsx'; // 1. Importe a rota protegida

function App() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Usuário deslogado');
      navigate('/');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <Routes>
      {/* Rota 1: Páginas públicas com o Header principal */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<PagInit />} /> 
        <Route path="cadastro" element={<PagCadastro />} />
      </Route>

      {/* Rota 2: Login (Página pública, layout próprio) */}
      <Route path="/login" element={<PagLogin />} />

      {/* Rota 3: Dashboard (Layout Próprio e PROTEGIDO) */}
      <Route element={<ProtectedRoute />}> {/* 2. Envolva a rota do dashboard */}
        <Route 
          path="/dashboard" 
          element={<PagDash onLogout={handleLogout} />} 
        />
        {/* Você pode adicionar mais rotas protegidas aqui dentro */}
      </Route>
      
    </Routes>
  );
}

export default App;