// src/App.tsx
import { Routes, Route, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Importando as Páginas
import PagInit from './pages/PagInit.tsx';
import PagCadastro from './pages/PagCadastro.tsx';
import PagLogin from './pages/PagLogin.tsx'; 
import PagDash from './pages/PagDash.tsx';
import PagActivities from './pages/PagActivities.tsx'; // Nova página de Módulos
import PagQuestions from './pages/PagQuestions.tsx'; // Nova página de Questões
import PagMinhasEstatisticas from './pages/PagMinhasEstatisticas.tsx';
import PagFeedback from './pages/PagFeedback.tsx'; // Página de Feedback 

// Importando Layouts e Rotas Protegidas
import MainLayout from './pages/MainLayout.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';

function App() {
  const navigate = useNavigate();

  // Função de logout compartilhada entre as páginas protegidas
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
      {/* --- ROTAS PÚBLICAS --- */}
      
      {/* Layout Principal (Header Inicial + Outlet) */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<PagInit />} /> 
        <Route path="cadastro" element={<PagCadastro />} />
      </Route>

      {/* Login (Layout próprio) */}
      <Route path="/login" element={<PagLogin />} />

      {/* --- ROTAS PROTEGIDAS (Requer Login) --- */}
      <Route element={<ProtectedRoute />}>
        
        {/* Dashboard Principal */}
        <Route 
          path="/dashboard" 
          element={<PagDash onLogout={handleLogout} />} 
        />

        {/* Tela de Atividades (Trilha de Aprendizado) */}
        <Route 
          path="/atividades" 
          element={<PagActivities onLogout={handleLogout} />} 
        />

        {/* Tela de Questões (Dinâmica por ID do módulo) */}
        <Route 
          path="/questoes/:moduleId" 
          element={<PagQuestions />} 
        />

        {/* Tela de Estatísticas */}
        <Route 
          path="/estatisticas" 
          element={<PagMinhasEstatisticas />} 
        />

        {/* Tela de Feedback */}
        <Route 
          path="/feedback" 
          element={<PagFeedback onLogout={handleLogout} />} 
        />

      </Route>
      
    </Routes>
  );
}
export default App;