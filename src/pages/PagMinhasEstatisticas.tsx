import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 

import Sidebar from '../Components/Sidebar';
import FloatingChatButton from '../Components/FloatingChatButton';
import ChatWidget from '../Components/ChatWidget'; // <--- IMPORTANTE
import { UserCircle, CaretLeft } from '@phosphor-icons/react';

// Importe o CSS
import '../Styles/MinhasEstatisticas.css';

// --- INTERFACES ---
interface UserStats {
  atividadesFeitas: number;
  totalAtividades: number; 
  questoesCertas: number;
  totalQuestoes: number;
  horasDedicadas: string;
  diasDedicados: number;
}

interface StatCardProps {
  value: string | number;
  label: string;
  hasProgress?: boolean;
  progressPercent?: number; 
  hasChart?: boolean;
  chartPercent?: number;
}

// --- SUBCOMPONENTE CARD ---
const StatCard: React.FC<StatCardProps> = ({ 
  value, label, hasProgress, progressPercent = 0, hasChart, chartPercent = 0 
}) => {
  
  const chartStyle = hasChart ? {
    background: `conic-gradient(
      #003366 0% ${chartPercent}%, 
      #bdc3c7 ${chartPercent}% 100%
    )`
  } : {};

  const progressStyle = hasProgress ? {
    width: `${progressPercent}%`
  } : {};

  return (
    <div className="card">
      <h2>{value}</h2>
      <p>{label}</p>
      
      {hasProgress && (
        <div className="progress-container">
          <div className="progress-bar" style={progressStyle}></div>
        </div>
      )}

      {hasChart && (
        <div className="pie-chart-sm" style={chartStyle}></div>
      )}
    </div>
  );
};

// --- PÁGINA PRINCIPAL ---
const PagMinhasEstatisticas: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [userName, setUserName] = useState<string>("...");
  
  // ESTADO DO CHAT
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const [stats, setStats] = useState<UserStats>({
    atividadesFeitas: 0,
    totalAtividades: 100,
    questoesCertas: 0,
    totalQuestoes: 100,
    horasDedicadas: "0H",
    diasDedicados: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      try {
        const token = await currentUser.getIdToken();
        const headers = { 'Authorization': `Bearer ${token}` };
        // Usa a variável de ambiente ou fallback
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

        // 1. Busca Nome
        const userRes = await fetch(`${API_URL}/user/profile`, { headers });
        if (userRes.ok) {
          const userData = await userRes.json();
          setUserName(userData.name || currentUser.displayName || 'Utilizador');
        }

        // 2. Busca Estatísticas (ajustado para a rota correta que criamos antes)
        const statsRes = await fetch(`${API_URL}/dashboard/metrics`, { headers });
        
        if (statsRes.ok) {
          const data = await statsRes.json();
          // Ajusta o mapeamento conforme o formato que o dashboardController retorna
          const s = data.stats || {};
          
          setStats({
            atividadesFeitas: s.atividadesFeitas || 0,
            totalAtividades: 20, // Total fixo ou vindo do back
            questoesCertas: s.questoesCertas || 0,
            totalQuestoes: s.questoesRespondidas || 50, 
            horasDedicadas: (s.horasDedicadas || 0) + "H",
            diasDedicados: s.diasDedicados || 0
          });
        } else {
           console.warn("API Stats não respondeu.");
        }

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const percentAtividades = Math.round((stats.atividadesFeitas / stats.totalAtividades) * 100) || 0;
  const percentQuestoes = stats.totalQuestoes > 0 ? Math.round((stats.questoesCertas / stats.totalQuestoes) * 100) : 0;

  const bigChartStyle = {
    background: `conic-gradient(
      #00aaff 0% ${percentAtividades}%, 
      #f1c40f ${percentAtividades}% ${percentAtividades + 20}%, 
      #bdc3c7 ${percentAtividades + 20}% 100%
    )`
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="container">
      
      <div style={{ flexShrink: 0 }}>
         <Sidebar onLogout={handleLogout} />
      </div>

      <main className="content">
        
        <header className="header">
          <div 
            style={{ display: 'flex', alignItems: 'center', marginRight: 'auto', cursor: 'pointer', color: '#003366', gap: '8px' }}
            onClick={() => navigate('/dashboard')}
          >
             <CaretLeft size={24} weight="bold" />
             <span style={{fontWeight: 'bold'}}>Voltar</span>
          </div>

          <div className="user-info">
            <span>{loading ? "Carregando..." : userName}</span>
            <UserCircle size={48} weight="fill" />
          </div>
        </header>

        <section className="stats-section">
          {loading ? (
             <p style={{color: '#003366', fontSize: '1.2rem'}}>Carregando suas conquistas...</p>
          ) : (
            <>
              <div className="cards-grid">
                <StatCard 
                  value={stats.atividadesFeitas} 
                  label="Atividades Feitas" 
                  hasProgress={true}
                  progressPercent={percentAtividades} 
                />
                <StatCard 
                  value={stats.questoesCertas} 
                  label="Questões certas" 
                  hasChart={true}
                  chartPercent={percentQuestoes} 
                />
                <StatCard value={stats.horasDedicadas} label="Horas dedicadas" />
                <StatCard value={stats.diasDedicados} label="Dias dedicados" />
              </div>

              <div className="extra-chart">
                 <div className="pie-chart-lg" style={bigChartStyle}></div>
              </div>
            </>
          )}
        </section>

        {/* CHAT WIDGET E BOTÃO CORRIGIDOS */}
        {isChatOpen && (
          <div style={{ position: 'fixed', bottom: '90px', right: '20px', zIndex: 1000 }}>
             <ChatWidget onClose={() => setIsChatOpen(false)} />
          </div>
        )}
        <FloatingChatButton onClick={toggleChat} />

      </main>
    </div>
  );
};

export default PagMinhasEstatisticas;