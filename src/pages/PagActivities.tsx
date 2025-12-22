// src/pages/PagActivities.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../Components/Sidebar';
import Header from '../Components/HeaderInit';
import styles from '../Styles/PagActivities.module.css';

interface PagActivitiesProps {
  onLogout: () => void;
}

interface Module {
  id: number;
  title: string;
  questions: string;
  status: "completed" | "in-progress" | "locked";
}

const PagActivities: React.FC<PagActivitiesProps> = ({ onLogout }) => {
  const { currentUser } = useAuth();
  const [userName, setUserName] = useState<string>("...");
  const navigate = useNavigate();

  // Busca o nome do usuário (mesma lógica do Dashboard)
  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const token = await currentUser.getIdToken();
          const userRes = await fetch('http://localhost:3001/api/user/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (userRes.ok) {
            const userData = await userRes.json();
            setUserName(userData.name || 'Utilizador');
          }
        } catch (error) {
          console.error("Erro ao buscar usuário", error);
        }
      };
      fetchUserData();
    }
  }, [currentUser]);

  // Dados dos módulos (Trazidos do seu exemplo)
  const modules: Module[] = [
    { id: 1, title: "Operações básicas", questions: "Questões: 10/10", status: "completed" },
    { id: 2, title: "Frações e decimais", questions: "Questões: 8/10", status: "completed" },
    { id: 3, title: "Porcentagem", questions: "Questões: 10/10", status: "completed" },
    { id: 4, title: "Equações lineares", questions: "Questões: 5/10", status: "in-progress" },
    { id: 5, title: "Geometria básica", questions: "Questões: 0/10", status: "locked" },
    { id: 6, title: "Probabilidade", questions: "Questões: 0/10", status: "locked" },
  ];

  const score = 38;
  const percentage = 38; // Exemplo fixo

  return (
    <div className={styles.pageLayout}>
      {/* Header */}
      <div style={{ gridArea: 'header' }}>
        <Header userName={userName} />
      </div>
      
      {/* Sidebar */}
      <div style={{ gridArea: 'sidebar' }}>
         <Sidebar onLogout={onLogout} />
      </div>
  
      {/* Conteúdo Principal */}
      <main className={styles.mainContent}>
        
        {/* Coluna da Esquerda: Lista de Módulos */}
        <div className={styles.contentColumn}>
            <h2 style={{ color: '#0A2540', marginBottom: '1rem' }}>Trilha de Aprendizado</h2>
            {modules.map((module) => (
                <div 
                    key={module.id} 
                    className={`${styles.moduleCard} ${module.status === 'locked' ? styles.locked : ''}`}
                    onClick={() => module.status !== 'locked' && console.log(`Abrir módulo ${module.id}`)}
                >
                    <div className={styles.moduleIcon} style={{
                        backgroundColor: module.status === 'completed' ? '#00FF00' : (module.status === 'in-progress' ? '#F4A261' : '#FFF'),
                        color: module.status === 'completed' ? '#fff' : '#0A2540',
                        border: module.status === 'locked' ? '2px solid #E5E7EB' : 'none'
                    }}>
                        {module.id}
                    </div>

                    <div className={styles.moduleInfo}>
                        <h3 className={styles.moduleTitle}>{module.title}</h3>
                        <p className={styles.moduleSubtitle}>{module.questions}</p>
                    </div>

                    <div className={styles.statusIcon} style={{
                         backgroundColor: module.status === 'locked' ? '#0A2540' : '#FFFFFF'
                    }}>
                        {module.status === 'locked' ? (
                            <span style={{ color: '#fff' }}>→</span>
                        ) : (
                            <span style={{ color: module.status === 'in-progress' ? '#0A2540' : '#00FF00' }}>
                                {module.status === 'completed' ? '✓' : '▶'}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>

        {/* Coluna da Direita: Card de Estatísticas */}
        <div className={styles.statsColumn}>
            <div className={styles.statsCard}>
                <h3 className={styles.statsTitle}>Quantidade de acertos</h3>
                
                <div className={styles.chartContainer}>
                    <svg className={styles.chartSvg} viewBox="0 0 200 200">
                        {/* Círculo de fundo */}
                        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(10, 37, 64, 0.1)" strokeWidth="16" strokeLinecap="round" />
                        {/* Círculo de progresso */}
                        <circle 
                            cx="100" cy="100" r="80" fill="none" stroke="#fff" strokeWidth="16" strokeLinecap="round" 
                            strokeDasharray={`${(percentage / 100) * 502.4} 502.4`}
                            style={{ transition: "stroke-dasharray 1s ease-in-out" }}
                        />
                    </svg>
                    <div className={styles.chartText}>{score}</div>
                </div>

                <p className={styles.progressText}>{percentage}% de progresso</p>
            </div>
        </div>

      </main>
    </div>
  );
}

export default PagActivities;