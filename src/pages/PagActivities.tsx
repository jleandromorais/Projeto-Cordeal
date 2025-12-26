// src/pages/PagActivities.tsx
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

// Dados das questões (Lista visual para a Avaliação)
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
  
  const [userName, setUserName] = useState<string>("Utilizador");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [expandedModuleId, setExpandedModuleId] = useState<number | null>(null);

  // Estados para as estatísticas
  const [totalScore, setTotalScore] = useState(0);      
  const [accuracyPercentage, setAccuracyPercentage] = useState(0); 

  useEffect(() => {
    if (currentUser) {
       setUserName("Utilizador");
    }

    const savedScores = JSON.parse(localStorage.getItem('cordeal_scores') || '{}');
    let correct = 0;
    let answeredTotal = 0;

    Object.keys(savedScores).forEach(moduleId => {
        const data = savedScores[moduleId];
        if (data) {
            correct += (data.correct || 0);
            answeredTotal += (data.total || 0);
        }
    });

    setTotalScore(correct);

    const calculatedPercentage = answeredTotal > 0 
        ? Math.round((correct / answeredTotal) * 100) 
        : 0;

    setAccuracyPercentage(calculatedPercentage);
  }, [currentUser]); 

  const modules: Module[] = [
    { 
      id: 1, 
      title: "Módulo 1", 
      topic: "Fator Comum em Evidência", 
      questionsCount: "5 Questões", 
      status: "completed" 
    },
    { 
      id: 2, 
      title: "Módulo 2", 
      topic: "Diferença de Quadrados", 
      questionsCount: "5 Questões", 
      status: "in-progress" 
    },
    { 
      id: 3, 
      title: "Módulo 3", 
      topic: "Trinômio do 2º Grau", 
      questionsCount: "5 Questões", 
      status: "in-progress" 
    },
    { id: 4, title: "Módulo 4", topic: "Aguardando", questionsCount: "Bloqueado", status: "locked" },
    { id: 5, title: "Módulo 5", topic: "Aguardando", questionsCount: "Bloqueado", status: "locked" },
  ];

  const completedCount = modules.filter(m => m.status === 'completed').length;
  
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

  // Navega para a página de questões (o padrão lá já é o Treino ou a aba que você definiu)
  const handleNavigate = (moduleId: number) => {
    navigate(`/questoes/${moduleId}`);
  };

  return (
    <div className={styles.pageLayout}>
      <div style={{ gridArea: 'header' }}><Header userName={userName} /></div>
      <div style={{ gridArea: 'sidebar' }}><Sidebar onLogout={onLogout} /></div>
  
      <main className={styles.mainContent}>
        
        {/* STEPPER */}
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
                        const currentReq = step.requiredCompleted;
                        const totalNeeded = nextStepReq - currentReq;
                        const progress = completedCount - currentReq;
                        const percent = totalNeeded > 0 ? (progress / totalNeeded) * 100 : 0;
                        lineFillWidth = `${Math.min(percent, 100)}%`;
                    }

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
            {/* LISTA DE MÓDULOS */}
            <div className={styles.contentColumn}>
                <h2 style={{ color: '#0A2540', marginBottom: '1rem' }}>Módulos Disponíveis</h2>
                
                {modules.map((module) => {
                    const isExpanded = expandedModuleId === module.id;
                    const questions = questionsData[module.id] || [];

                    return (
                        <div key={module.id} className={`${styles.moduleCardWrapper} ${module.status === 'locked' ? styles.locked : ''} ${isExpanded ? styles.expanded : ''}`}>
                            
                            {/* Cabeçalho do Card */}
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

                            {/* Conteúdo Expandido */}
                            {isExpanded && (
                                <div className={styles.questionsList}>
                                    
                                    {/* --- BARRA MODO TREINO (ÚNICA) --- */}
                                    <div 
                                        className={styles.questionItem} 
                                        onClick={() => handleNavigate(module.id)}
                                        style={{
                                            backgroundColor: '#007bff', 
                                            color: '#fff', 
                                            justifyContent: 'center', 
                                            marginBottom: '10px',
                                            border: 'none'
                                        }}
                                    >
                                        <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                            <i className="fas fa-dumbbell" style={{marginRight: '8px'}}></i>
                                            MODO TREINO
                                        </span>
                                    </div>

                                    {/* Lista de Questões (Avaliação) */}
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

            {/* CARD DE ESTATÍSTICAS */}
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