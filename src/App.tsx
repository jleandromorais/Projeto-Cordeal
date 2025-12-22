// src/App.tsx
import { Routes, Route, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Importando as Páginas
import PagInit from './pages/PagInit.tsx';
import PagDash from './pages/PagDash.tsx';
import PagCadastro from './pages/PagCadastro.tsx';
import PagLogin from './pages/PagLogin.tsx'; 
import PagActivities from './pages/PagActivities.tsx'; // 1. Importe a nova página

import MainLayout from './pages/MainLayout.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';

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
      <Route path="/" element={<MainLayout />}>
        <Route index element={<PagInit />} /> 
        <Route path="cadastro" element={<PagCadastro />} />
      </Route>

      <Route path="/login" element={<PagLogin />} />

      {/* Rotas Protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route 
          path="/dashboard" 
          element={<PagDash onLogout={handleLogout} />} 
        />
        {/* 2. Adicione a nova rota aqui */}
        <Route 
          path="/atividades" 
          element={<PagActivities onLogout={handleLogout} />} 
        />
      </Route>
      
    </Routes>
  );
}

export default App;