import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../Components/Sidebar';
import Header from '../Components/HeaderInit';
import ChatWidget from '../Components/ChatWidget';
import FloatingChatButton from '../Components/FloatingChatButton';

import styles from '../Styles/PagActivities.module.css';

interface PagActivitiesProps {
  onLogout: () => void;
}

interface Module {
  id: number;
  title: string;
  topic: string;
  questionsCount: string;
  status: "completed" | "in-progress" | "locked";
}

const questionsData: Record<number, string[]> = {
  1: ["Questão 1", "Questão 2", "Questão 3", "Questão 4", "Questão 5"],
  2: ["Questão 1", "Questão 2", "Questão 3", "Questão 4", "Questão 5"],
  3: ["Questão 1", "Questão 2", "Questão 3", "Questão 4", "Questão 5"],
  4: [],
  5: []
};

const PagActivities: React.FC<PagActivitiesProps> = ({ onLogout }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // CORREÇÃO: Começa com "..." para indicar carregamento
  const [userName, setUserName] = useState<string>("...");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [expandedModuleId, setExpandedModuleId] = useState<number | null>(null);

  const [totalScore, setTotalScore] = useState(0);      
  const [accuracyPercentage, setAccuracyPercentage] = useState(0); 
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  useEffect(() => {
    const fetchUserDataAndProgress = async () => {
        if (!currentUser) return;

        try {
            const token = await currentUser.getIdToken();
            const headers = { 'Authorization': `Bearer ${token}` };
            const API_URL = 'http://localhost:3001/api'; // Ajuste se a porta for diferente

            // 1. BUSCAR O NOME (Perfil)
            const userRes = await fetch(`${API_URL}/user/profile`, { headers });
            if (userRes.ok) {
                const userData = await userRes.json();
                // Prioriza o nome vindo do backend
                setUserName(userData.name || 'Utilizador');
            }

            // 2. BUSCAR O PROGRESSO (Métricas)
            const metricsRes = await fetch(`${API_URL}/dashboard/metrics`, { headers });
            if (metricsRes.ok) {
                const data = await metricsRes.json();
                
                const stats = data.stats || { questoesCertas: 0, questoesRespondidas: 0 };
                setTotalScore(stats.questoesCertas);
                
                const percent = stats.questoesRespondidas > 0 
                    ? Math.round((stats.questoesCertas / stats.questoesRespondidas) * 100)
                    : 0;
                setAccuracyPercentage(percent);

                const doneIds: number[] = [];
                if (data.modules) {
                    Object.keys(data.modules).forEach(key => {
                        if (data.modules[key].completed) {
                            doneIds.push(Number(key));
                        }
                    });
                }
                setCompletedModules(doneIds);
            }

        } catch (error) {
            console.error("Erro ao carregar dados:", error);
            setUserName("Utilizador"); // Fallback em caso de erro
        }
    };

    fetchUserDataAndProgress();
  }, [currentUser]); 

  // Lógica dos módulos baseada no progresso vindo do banco
  const modules: Module[] = [
    { 
      id: 1, 
      title: "Módulo 1", 
      topic: "Fator Comum em Evidência", 
      questionsCount: "5 Questões", 
      status: completedModules.includes(1) ? "completed" : "in-progress" 
    },
    { 
      id: 2, 
      title: "Módulo 2", 
      topic: "Diferença de Quadrados", 
      questionsCount: "5 Questões", 
      status: completedModules.includes(2) ? "completed" : (completedModules.includes(1) ? "in-progress" : "locked")
    },
    { 
      id: 3, 
      title: "Módulo 3", 
      topic: "Trinômio do 2º Grau", 
      questionsCount: "5 Questões", 
      status: completedModules.includes(3) ? "completed" : (completedModules.includes(2) ? "in-progress" : "locked")
    },
    { id: 4, title: "Módulo 4", topic: "Aguardando", questionsCount: "Bloqueado", status: "locked" },
    { id: 5, title: "Módulo 5", topic: "Aguardando", questionsCount: "Bloqueado", status: "locked" },
  ];

  const completedCount = completedModules.length;
  
  const steps = [
    { id: 1, requiredCompleted: 0 },
    { id: 2, requiredCompleted: 1 },
    { id: 3, requiredCompleted: 3 },
  ];

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleModuleClick = (moduleId: number, status: string) => {
    if (status === 'locked') return;
    setExpandedModuleId(expandedModuleId === moduleId ? null : moduleId);
  };

  const handleNavigate = (moduleId: number) => {
    navigate(`/questoes/${moduleId}`);
  };

  return (
    <div className={styles.pageLayout}>
      <div style={{ gridArea: 'header' }}><Header userName={userName} /></div>
      <div style={{ gridArea: 'sidebar' }}><Sidebar onLogout={onLogout} /></div>
  
      <main className={styles.mainContent}>
        
        {/* STEPPER (Igual ao anterior) */}
        <section className={styles.stepperContainer}>
            <div className={styles.stepperTitle}>TRILHA</div>
            <div className={styles.stepperSteps}>
                {steps.map((step, index) => {
                    const isLast = index === steps.length - 1;
                    let stepClass = styles.stepInactive;
                    let lineFillWidth = '0%';
                    const nextStepReq = steps[index + 1]?.requiredCompleted || 99;
                    
                    if (completedCount >= nextStepReq) {
                        stepClass = styles.stepCompleted;
                        lineFillWidth = '100%';
                    } else if (completedCount >= step.requiredCompleted) {
                        stepClass = styles.stepCurrent;
                        const totalNeeded = nextStepReq - currentReq;
                        const progress = completedCount - currentReq;
                        const percent = totalNeeded > 0 ? (progress / totalNeeded) * 100 : 0;
                        lineFillWidth = `${Math.min(percent, 100)}%`;
                    }
                    var currentReq = step.requiredCompleted; // (Auxiliar para o calculo acima funcionar bem no copy paste)

                    return (
                        <React.Fragment key={step.id}>
                            <div className={`${styles.stepCircle} ${stepClass}`}>
                                {stepClass === styles.stepCompleted ? '✓' : step.id}
                            </div>
                            {!isLast && (
                                <div className={`${styles.stepLine} ${styles.lineInactive}`}>
                                    <div className={styles.stepLineFill} style={{ width: lineFillWidth }}></div>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </section>

        <div className={styles.contentRow}>
            <div className={styles.contentColumn}>
                <h2 style={{ color: '#0A2540', marginBottom: '1rem' }}>Módulos Disponíveis</h2>
                {modules.map((module) => {
                    const isExpanded = expandedModuleId === module.id;
                    const questions = questionsData[module.id] || [];

                    return (
                        <div key={module.id} className={`${styles.moduleCardWrapper} ${module.status === 'locked' ? styles.locked : ''} ${isExpanded ? styles.expanded : ''}`}>
                            <div className={styles.moduleHeader} onClick={() => handleModuleClick(module.id, module.status)}>
                                <div className={styles.moduleIcon} style={{
                                    backgroundColor: module.status === 'completed' ? '#00FF00' : (module.status === 'in-progress' ? '#F4A261' : '#FFF'),
                                    color: module.status === 'completed' ? '#fff' : '#0A2540',
                                    border: module.status === 'locked' ? '2px solid #E5E7EB' : 'none'
                                }}>
                                    {module.id}
                                </div>
                                <div className={styles.moduleInfo}>
                                    <h3 className={styles.moduleTitle}>{module.title}</h3>
                                    <p className={styles.moduleSubtitle}>{module.topic}</p>
                                </div>
                                <div className={styles.statusIcon}>
                                    {module.status === 'locked' ? '🔒' : (module.status === 'completed' ? '✓' : (isExpanded ? '▲' : '▼'))}
                                </div>
                            </div>
                            {isExpanded && (
                                <div className={styles.questionsList}>
                                    <div className={styles.questionItem} onClick={() => handleNavigate(module.id)}
                                        style={{ backgroundColor: '#007bff', color: '#fff', justifyContent: 'center', marginBottom: '10px', border: 'none' }}>
                                        <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                            <i className="fas fa-dumbbell" style={{marginRight: '8px'}}></i>
                                            MODO TREINO
                                        </span>
                                    </div>
                                    {questions.map((q, idx) => (
                                        <div key={idx} className={styles.questionItem} onClick={() => handleNavigate(module.id)}>
                                            <span style={{ fontWeight: 500 }}>{q}</span>
                                            <button className={styles.playBtn}>▶</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className={styles.statsColumn}>
                <div className={styles.statsCard}>
                    <h3 className={styles.statsTitle}>Sua Performance</h3>
                    <div className={styles.chartContainer}>
                        <svg className={styles.chartSvg} viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(10, 37, 64, 0.1)" strokeWidth="16" strokeLinecap="round" />
                            <circle 
                                cx="100" cy="100" r="80" fill="none" stroke={accuracyPercentage > 50 ? "#00FF00" : "#F4A261"} strokeWidth="16" strokeLinecap="round" 
                                strokeDasharray={`${(accuracyPercentage / 100) * 502.4} 502.4`}
                                style={{ transition: "stroke-dasharray 1s ease-in-out" }}
                            />
                        </svg>
                        <div className={styles.chartText}>{totalScore} pts</div>
                    </div>
                    <p className={styles.progressText}>{accuracyPercentage}% de precisão</p>
                </div>
            </div>
        </div>
      </main>

      <div className={styles.chatContainer}>
         {isChatOpen && <ChatWidget onClose={() => setIsChatOpen(false)} />}
      </div>
      <FloatingChatButton onClick={toggleChat} />
    </div>
  );
}

export default PagActivities;