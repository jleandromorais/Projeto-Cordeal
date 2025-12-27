import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 

import Sidebar from '../Components/Sidebar';
import FloatingChatButton from '../Components/FloatingChatButton';
import { UserCircle, CaretLeft } from '@phosphor-icons/react';

// Importe o CSS (mas lembre-se de limpar a parte da Sidebar lá dentro, já que usamos o componente agora)
import '../Styles/MinhasEstatisticas.css';

// --- INTERFACES ---
interface UserStats {
  atividadesFeitas: number;
  totalAtividades: number; // Adicionei para calcular %
  questoesCertas: number;
  totalQuestoes: number;   // Adicionei para calcular %
  horasDedicadas: string;
  diasDedicados: number;
}

interface StatCardProps {
  value: string | number;
  label: string;
  hasProgress?: boolean;
  progressPercent?: number; // Nova prop para a barra
  hasChart?: boolean;
  chartPercent?: number;    // Nova prop para o gráfico pequeno
}

// --- SUBCOMPONENTE CARD ---
const StatCard: React.FC<StatCardProps> = ({ 
  value, label, hasProgress, progressPercent = 0, hasChart, chartPercent = 0 
}) => {
  
  // Lógica dinâmica para o gráfico pequeno (Questões)
  // Se chartPercent for 70, pinta 70% de azul e o resto de cinza
  const chartStyle = hasChart ? {
    background: `conic-gradient(
      #003366 0% ${chartPercent}%, 
      #bdc3c7 ${chartPercent}% 100%
    )`
  } : {};

  // Lógica dinâmica para a barra de progresso
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
        // Aplicamos o style dinâmico aqui
        <div className="pie-chart-sm" style={chartStyle}></div>
      )}
    </div>
  );
};

// --- PÁGINA PRINCIPAL ---
const PagMinhasEstatisticas: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // Estado para o Nome e para os Dados
  const [userName, setUserName] = useState<string>("...");
  const [stats, setStats] = useState<UserStats>({
    atividadesFeitas: 0,
    totalAtividades: 100,
    questoesCertas: 0,
    totalQuestoes: 100,
    horasDedicadas: "0H",
    diasDedicados: 0
  });

  const [loading, setLoading] = useState(true);

  // useEffect Único para buscar TUDO (Perfil + Stats)
  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      try {
        const token = await currentUser.getIdToken();
        const headers = { 'Authorization': `Bearer ${token}` };
        const API_URL = 'http://localhost:3001/api';

        // 1. Busca Nome (Igual ao PagDash)
        const userRes = await fetch(`${API_URL}/user/profile`, { headers });
        if (userRes.ok) {
          const userData = await userRes.json();
          setUserName(userData.name || currentUser.displayName || 'Utilizador');
        }

        // 2. Busca Estatísticas
        // Nota: Você precisará criar essa rota no backend ou ajustar para onde seus dados estão
        const statsRes = await fetch(`${API_URL}/user/stats`, { headers });
        
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats({
            atividadesFeitas: statsData.completedActivities || 0,
            totalAtividades: statsData.totalActivities || 20, // Exemplo
            questoesCertas: statsData.correctQuestions || 0,
            totalQuestoes: statsData.totalQuestions || 50,    // Exemplo
            horasDedicadas: statsData.hours || "0H",
            diasDedicados: statsData.days || 0
          });
        } else {
          // Dados Fake para teste visual se a API falhar
          console.warn("API Stats não respondeu. Usando dados fictícios.");
          setUserName(currentUser.displayName || "Alessandra (Teste)");
          setStats({
            atividadesFeitas: 8,
            totalAtividades: 20,
            questoesCertas: 42,
            totalQuestoes: 50,
            horasDedicadas: "12H",
            diasDedicados: 5
          });
        }

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  // Cálculos de Porcentagem para os gráficos
  const percentAtividades = Math.round((stats.atividadesFeitas / stats.totalAtividades) * 100) || 0;
  const percentQuestoes = Math.round((stats.questoesCertas / stats.totalQuestoes) * 100) || 0;

  // Lógica para o Gráfico Grande (Exemplo: Distribuição de tempo ou progresso geral)
  // Aqui criei um degradê baseado no progresso de atividades
  const bigChartStyle = {
    background: `conic-gradient(
      #00aaff 0% ${percentAtividades}%, 
      #f1c40f ${percentAtividades}% ${percentAtividades + 20}%, 
      #bdc3c7 ${percentAtividades + 20}% 100%
    )`
  };

  const handleLogout = () => {
    // Adicione sua lógica de logout do firebase aqui se necessário
    navigate('/');
  };

  return (
    <div className="container">
      
      {/* Sidebar Compartilhada */}
      <div style={{ flexShrink: 0 }}>
         <Sidebar onLogout={handleLogout} />
      </div>

      <main className="content">
        
        <header className="header">
          {/* Botão Voltar */}
          <div 
            style={{ display: 'flex', alignItems: 'center', marginRight: 'auto', cursor: 'pointer', color: '#003366', gap: '8px' }}
            onClick={() => navigate('/dashboard')}
          >
             <CaretLeft size={24} weight="bold" />
             <span style={{fontWeight: 'bold'}}>Voltar</span>
          </div>

          <div className="user-info">
            {/* NOME DINÂMICO AQUI */}
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
                
                {/* Card 1: Atividades (Barra de progresso dinâmica) */}
                <StatCard 
                  value={stats.atividadesFeitas} 
                  label="Atividades Feitas" 
                  hasProgress={true}
                  progressPercent={percentAtividades} 
                />
                
                {/* Card 2: Questões (Gráfico pizza dinâmico) */}
                <StatCard 
                  value={stats.questoesCertas} 
                  label="Questões certas" 
                  hasChart={true}
                  chartPercent={percentQuestoes} 
                />
                
                <StatCard value={stats.horasDedicadas} label="Horas dedicadas" />
                
                <StatCard value={stats.diasDedicados} label="Dias dedicados" />
              </div>

              {/* Gráfico Grande Lateral (Dinâmico) */}
              <div className="extra-chart">
                 <div className="pie-chart-lg" style={bigChartStyle}></div>
                 {/* Dica: Você pode colocar uma legenda aqui embaixo se quiser */}
              </div>
            </>
          )}

        </section>

        <FloatingChatButton />

      </main>
    </div>
  );
};

export default PagMinhasEstatisticas;