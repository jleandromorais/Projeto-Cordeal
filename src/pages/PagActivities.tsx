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
  questionsCount: string;
  status: "completed" | "in-progress" | "locked";
}

// Mapeamento de questões (Simulação)
const questionsData: Record<number, string[]> = {
  1: ["Questão 1: Soma simples", "Questão 2: Subtração", "Questão 3: Multiplicação básica", "Questão 4: Divisão exata"],
  2: ["Questão 1: Frações equivalentes", "Questão 2: Soma de frações", "Questão 3: Decimais"],
  3: ["Questão 1: Cálculo de 10%", "Questão 2: Descontos", "Questão 3: Juros simples"],
  4: ["Questão 1: Encontrar X", "Questão 2: Simplificação"],
  5: [],
  6: []
};

const PagActivities: React.FC<PagActivitiesProps> = ({ onLogout }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [userName, setUserName] = useState<string>("...");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [expandedModuleId, setExpandedModuleId] = useState<number | null>(null);

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
          setUserName("Utilizador");
        }
      };
      fetchUserData();
    }
  }, [currentUser]);

  // Lista de Módulos
  const modules: Module[] = [
    { id: 1, title: "Operações básicas", questionsCount: "Questões: 10/10", status: "completed" },
    { id: 2, title: "Frações e decimais", questionsCount: "Questões: 8/10", status: "completed" },
    { id: 3, title: "Porcentagem", questionsCount: "Questões: 10/10", status: "completed" },
    { id: 4, title: "Equações lineares", questionsCount: "Questões: 5/10", status: "in-progress" },
    { id: 5, title: "Geometria básica", questionsCount: "Questões: 0/10", status: "locked" },
    { id: 6, title: "Probabilidade", questionsCount: "Questões: 0/10", status: "locked" },
  ];

  // --- LÓGICA DO STEPPER (BARRA DE PROGRESSO) ---
  const completedCount = modules.filter(m => m.status === 'completed').length;
  
  // Define os marcos da barra de progresso
  const steps = [
    { id: 1, requiredCompleted: 0 },  // Início
    { id: 2, requiredCompleted: 2 },  // Intermediário (após 2 módulos)
    { id: 3, requiredCompleted: 4 },  // Avançado (após 4 módulos)
  ];

  const score = 38;
  const percentage = 38;

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  // Expande ou recolhe o módulo (Accordion)
  const handleModuleClick = (moduleId: number, status: string) => {
    if (status === 'locked') return;
    setExpandedModuleId(expandedModuleId === moduleId ? null : moduleId);
  };

  // Navega para a tela de questões ao clicar em uma questão específica
  const handleQuestionClick = (moduleId: number) => {
    navigate(`/questoes/${moduleId}`);
  };

  return (
    <div className={styles.pageLayout}>
      <div style={{ gridArea: 'header' }}>
        <Header userName={userName} />
      </div>
      
      <div style={{ gridArea: 'sidebar' }}>
         <Sidebar onLogout={onLogout} />
      </div>
  
      <main className={styles.mainContent}>
        
        {/* --- STEPPER DINÂMICO --- */}
        <section className={styles.stepperContainer}>
            <div className={styles.stepperTitle}>TRUPICO</div>
            
            <div className={styles.stepperSteps}>
                {steps.map((step, index) => {
                    const isLast = index === steps.length - 1;
                    
                    // Lógica para determinar a cor do círculo e da linha
                    let stepClass = styles.stepInactive;
                    let lineFillWidth = '0%';

                    // Se já completou requisitos para o PRÓXIMO nível, este está "passado" (verde)
                    const nextStepReq = steps[index + 1]?.requiredCompleted || 99;
                    
                    if (completedCount >= nextStepReq) {
                        stepClass = styles.stepCompleted;
                        lineFillWidth = '100%';
                    } 
                    // Se atingiu o requisito deste nível, é o atual (azul/destaque)
                    else if (completedCount >= step.requiredCompleted) {
                        stepClass = styles.stepCurrent;
                        
                        // Calcula preenchimento parcial da linha para o próximo
                        const currentReq = step.requiredCompleted;
                        const totalNeededForNext = nextStepReq - currentReq;
                        const progressInCurrentStep = completedCount - currentReq;
                        
                        // Evita divisão por zero
                        const percent = totalNeededForNext > 0 
                            ? (progressInCurrentStep / totalNeededForNext) * 100 
                            : 0;
                            
                        lineFillWidth = `${Math.min(percent, 100)}%`;
                    }

                    return (
                        <React.Fragment key={step.id}>
                            {/* Círculo */}
                            <div className={`${styles.stepCircle} ${stepClass}`}>
                                {stepClass === styles.stepCompleted ? '✓' : step.id}
                            </div>

                            {/* Linha (exceto para o último) */}
                            {!isLast && (
                                <div className={`${styles.stepLine} ${styles.lineInactive}`}>
                                    <div 
                                        className={styles.stepLineFill} 
                                        style={{ width: lineFillWidth }}
                                    ></div>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </section>

        <div className={styles.contentRow}>
            {/* Lista de Módulos (Accordion) */}
            <div className={styles.contentColumn}>
                <h2 style={{ color: '#0A2540', marginBottom: '1rem' }}>Trilha de Aprendizado</h2>
                
                {modules.map((module) => {
                    const isExpanded = expandedModuleId === module.id;
                    const questions = questionsData[module.id] || [];

                    return (
                        <div 
                            key={module.id} 
                            className={`${styles.moduleCardWrapper} ${module.status === 'locked' ? styles.locked : ''} ${isExpanded ? styles.expanded : ''}`}
                        >
                            {/* Cabeçalho do Card (Clique para expandir) */}
                            <div 
                                className={styles.moduleHeader}
                                onClick={() => handleModuleClick(module.id, module.status)}
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
                                    <p className={styles.moduleSubtitle}>{module.questionsCount}</p>
                                </div>

                                <div className={styles.statusIcon} style={{
                                    backgroundColor: module.status === 'locked' ? '#0A2540' : '#FFFFFF',
                                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                                }}>
                                    {module.status === 'locked' ? (
                                        <span style={{ color: '#fff' }}>→</span>
                                    ) : (
                                        <span style={{ color: module.status === 'in-progress' ? '#0A2540' : '#00FF00' }}>
                                            {module.status === 'completed' ? '✓' : '▼'}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Lista de Questões (Expandida) */}
                            <div className={styles.questionsList}>
                                {questions.length > 0 ? (
                                    questions.map((q, idx) => (
                                        <div 
                                            key={idx} 
                                            className={styles.questionItem}
                                            // Clicar na linha também pode navegar, se desejar
                                            onClick={() => handleQuestionClick(module.id)}
                                            style={{cursor: 'pointer'}}
                                        >
                                            <span style={{fontSize: '0.9rem', color: '#333'}}>{q}</span>
                                            <button 
                                                className={styles.playBtn}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Evita duplo clique
                                                    handleQuestionClick(module.id);
                                                }}
                                            >
                                                ▶
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{padding: '1rem', textAlign: 'center', color: '#666'}}>
                                        Nenhuma questão disponível neste momento.
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Stats Card */}
            <div className={styles.statsColumn}>
                <div className={styles.statsCard}>
                    <h3 className={styles.statsTitle}>Quantidade de acertos</h3>
                    <div className={styles.chartContainer}>
                        <svg className={styles.chartSvg} viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(10, 37, 64, 0.1)" strokeWidth="16" strokeLinecap="round" />
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
        </div>
      </main>

      {/* CHAT WIDGET */}
      <div className={styles.chatContainer}>
         {isChatOpen && <ChatWidget onClose={() => setIsChatOpen(false)} />}
      </div>
      <FloatingChatButton onClick={toggleChat} />
    </div>
  );
}

export default PagActivities;