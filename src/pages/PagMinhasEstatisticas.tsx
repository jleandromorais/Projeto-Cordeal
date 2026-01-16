import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 
import Sidebar from '../Components/Sidebar';
import FloatingChatButton from '../Components/FloatingChatButton';
import { UserCircle, CaretLeft } from '@phosphor-icons/react';
import '../Styles/MinhasEstatisticas.css';

const PagMinhasEstatisticas: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [userName, setUserName] = useState("...");
  
  // Estado inicial ZERADO
  const [stats, setStats] = useState({
    atividadesFeitas: 0,
    totalAtividades: 15,
    questoesCertas: 0,
    totalQuestoes: 0,
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
        
        // 1. Nome
        fetch('http://localhost:3001/api/user/profile', { headers })
           .then(r => r.json()).then(d => setUserName(d.name || "User"));

        // 2. Stats
        const res = await fetch('http://localhost:3001/api/user/stats', { headers });
        if (res.ok) {
          const d = await res.json();
          setStats({
            atividadesFeitas: d.completedActivities || 0,
            totalAtividades: 15,
            questoesCertas: d.correctQuestions || 0,
            totalQuestoes: d.totalQuestions || 0,
            horasDedicadas: d.hours || "0H",
            diasDedicados: d.days || 0
          });
        }
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchData();
  }, [currentUser]);

  // Cálculos seguros (evitar divisão por zero)
  const percentAtiv = stats.totalAtividades > 0 ? Math.round((stats.atividadesFeitas / stats.totalAtividades) * 100) : 0;
  const percentQuest = stats.totalQuestoes > 0 ? Math.round((stats.questoesCertas / stats.totalQuestoes) * 100) : 0;

  const bigChartStyle = {
    background: `conic-gradient(#00aaff 0% ${percentAtiv}%, #bdc3c7 ${percentAtiv}% 100%)`
  };

  return (
    <div className="container">
      <div style={{ flexShrink: 0 }}><Sidebar onLogout={() => navigate('/')} /></div>
      <main className="content">
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto', cursor: 'pointer', color: '#003366', gap: '8px' }} onClick={() => navigate('/dashboard')}>
             <CaretLeft size={24} weight="bold" /><span>Voltar</span>
          </div>
          <div className="user-info"><span>{loading ? "..." : userName}</span><UserCircle size={48} weight="fill" /></div>
        </header>

        <section className="stats-section">
          {loading ? <p>Carregando...</p> : (
            <>
              <div className="cards-grid">
                <div className="card">
                   <h2>{stats.atividadesFeitas}</h2><p>Atividades Feitas</p>
                   <div className="progress-container"><div className="progress-bar" style={{width:`${percentAtiv}%`}}></div></div>
                </div>
                <div className="card">
                   <h2>{stats.questoesCertas}</h2><p>Questões certas</p>
                   <div className="pie-chart-sm" style={{background: `conic-gradient(#003366 0% ${percentQuest}%, #bdc3c7 ${percentQuest}% 100%)`}}></div>
                </div>
                <div className="card"><h2>{stats.horasDedicadas}</h2><p>Horas</p></div>
                <div className="card"><h2>{stats.diasDedicados}</h2><p>Dias</p></div>
              </div>
              <div className="extra-chart"><div className="pie-chart-lg" style={bigChartStyle}></div></div>
            </>
          )}
        </section>
        <FloatingChatButton />
      </main>
    </div>
  );
};
export default PagMinhasEstatisticas;