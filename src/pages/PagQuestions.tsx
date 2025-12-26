// src/pages/PagQuestions.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

import Sidebar from '../Components/Sidebar';
import Header from '../Components/HeaderInit';
import styles from '../Styles/PagQuestions.module.css';

// --- Interfaces ---

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface ModuleData {
  topicTitle: string;
  questions: Question[]; // Apenas as questões de avaliação
}

// --- Dados Mockados (Apenas as questões contextualizadas do Quiz) ---
const modulesData: Record<string, ModuleData> = {
  "1": { // Módulo 1
    topicTitle: "Fatoração por Fator Comum",
    questions: [
      { id: 101, text: "1. Um algoritmo executa operações proporcionais a x. O custo total é dado por: (2x² + 2xy) / 2x. Simplifique.", options: ["x - y", "x + y", "2x + y", "x + 2y"], correctAnswer: 1 },
      { id: 102, text: "2. A quantidade de dados processados por um servidor é modelada por: (3s² - 3st) / 3s.", options: ["s - t", "s + t", "3s - t", "s - 3t"], correctAnswer: 0 },
      { id: 103, text: "3. O tempo total de execução depende de três módulos: (4m² + 4mn + 4mp) / 4m.", options: ["m - n + p", "m + n - p", "m + n + p", "4m + n + p"], correctAnswer: 2 },
      { id: 104, text: "4. O tráfego gerado por dois processos em uma rede é dado por: (5y² - 5yx) / 5y.", options: ["y + x", "5y - x", "x - y", "y - x"], correctAnswer: 3 },
      { id: 105, text: "5. O consumo de memória de um sistema é modelado por: (6p² + 6pq - 6pr) / 6p.", options: ["p - q - r", "p + q - r", "p + q + r", "6p + q - r"], correctAnswer: 1 }
    ]
  },
  "2": { // Módulo 2
    topicTitle: "Diferença de Quadrados",
    questions: [
      { id: 201, text: "1. O tempo de execução de dois processos é dado por: (4t² - 36s²) / (2t - 6s).", options: ["2t + 6s", "2t - 6s", "4t + 6s", "2t + 12s"], correctAnswer: 0 },
      { id: 202, text: "2. A diferença de armazenamento usado entre duas tabelas é: (9u² - 16v²) / (3u - 4v).", options: ["3u - 4v", "3u + 4v", "9u + 4v", "3u + 16v"], correctAnswer: 1 },
      { id: 203, text: "3. O tráfego máximo permitido em dois canais é: (49x² - 64y²) / (7x - 8y).", options: ["7x + 8y", "7x - 8y", "49x + 8y", "7x + 64y"], correctAnswer: 0 },
      { id: 204, text: "4. O consumo de memória de dois módulos do sistema é: (36p² - 25q²) / (6p - 5q).", options: ["6p - 5q", "36p + 5q", "6p + 25q", "6p + 5q"], correctAnswer: 3 },
      { id: 205, text: "5. A diferença de combinações de senhas entre dois sistemas é: (121a² - 9b²) / (11a - 3b).", options: ["11a - 3b", "121a + 3b", "11a + 9b", "11a + 3b"], correctAnswer: 3 }
    ]
  },
  "3": { // Módulo 3
    topicTitle: "Trinômio do 2º Grau",
    questions: [
      { id: 301, text: "1. O tempo de processamento de uma query é modelado por: (x² + 7x + 12) / (x + 3).", options: ["x - 4", "x + 4", "x + 3", "x - 3"], correctAnswer: 1 },
      { id: 302, text: "2. A diferença de espaço entre duas tabelas é: (y² - 5y + 6) / (y - 2).", options: ["y - 3", "y + 3", "y - 2", "y + 2"], correctAnswer: 0 },
      { id: 303, text: "3. O tempo total de execução de dois processos é dado por: (m² - 4m - 12) / (m + 2).", options: ["m + 6", "m - 2", "m - 6", "m + 4"], correctAnswer: 2 },
      { id: 304, text: "4. O fluxo de dados entre dois servidores é: (p² + 6p + 8) / (p + 4).", options: ["p - 2", "p + 4", "p - 4", "p + 2"], correctAnswer: 3 },
      { id: 305, text: "5. O consumo de memória de dois módulos do sistema é: (a² - 11a + 30) / (a - 6).", options: ["a - 5", "a + 5", "a - 6", "a + 6"], correctAnswer: 0 }
    ]
  }
};

const PagQuestions: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // -- Estados --
  const [userName, setUserName] = useState("...");

  // Estados Quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    if (currentUser) setUserName("Utilizador");
  }, [currentUser]);

  const moduleData = moduleId && modulesData[moduleId] ? modulesData[moduleId] : null;

  if (!moduleData) {
    return (
        <div className={styles.pageLayout}>
            <div style={{gridArea: 'header'}}><Header userName={userName} /></div>
            <div style={{gridArea: 'sidebar'}}><Sidebar onLogout={() => {}} /></div>
            <main className={styles.mainContent}>
                <h2>Módulo não encontrado.</h2>
                <button onClick={() => navigate('/atividades')}>Voltar</button>
            </main>
        </div>
    );
  }

  // --- Renderização do Relatório Final (Aparece ao fim do Quiz) ---
  if (showReport) {
    const questions = moduleData.questions;
    const totalQuestions = questions.length;
    let correctCount = 0;
    
    const reportItems = questions.map(q => {
        const userAnswerIndex = answers[q.id];
        const isCorrect = userAnswerIndex === q.correctAnswer;
        if (isCorrect) correctCount++;
        return { ...q, userAnswerIndex, isCorrect };
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const isPass = percentage >= 70;

    return (
        <div className={styles.pageLayout}>
            <div style={{ gridArea: 'header' }}><Header userName={userName} /></div>
            <div style={{ gridArea: 'sidebar' }}><Sidebar onLogout={() => navigate('/')} /></div>
            <main className={styles.mainContent}>
                <div className={styles.questionCard} style={{ maxWidth: '800px' }}>
                    <h2 style={{ color: '#333', marginBottom: '10px' }}>Relatório de Desempenho</h2>
                    <div style={{ padding: '20px', background: isPass ? '#d4edda' : '#f8d7da', color: isPass ? '#155724' : '#721c24', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '3rem', margin: 0 }}>{percentage}%</h1>
                        <p>{isPass ? "Excelente! Módulo concluído." : "Você pode melhorar. Tente novamente."}</p>
                        <p>Acertos: {correctCount} de {totalQuestions}</p>
                    </div>

                    {/* Detalhamento das Respostas */}
                    <div style={{ textAlign: 'left', marginTop: '20px' }}>
                        {reportItems.map((item, idx) => (
                            <div key={item.id} style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
                                <p><strong>Questão {idx + 1}:</strong> {item.text}</p>
                                {item.isCorrect ? (
                                    <span style={{ color: 'green', fontWeight: 'bold' }}>
                                        <i className="fas fa-check"></i> Correto: {item.options[item.correctAnswer]}
                                    </span>
                                ) : (
                                    <div style={{ color: 'red' }}>
                                        <div>Sua resposta: <span style={{ textDecoration: 'line-through' }}>{item.options[item.userAnswerIndex] || "Nenhuma"}</span></div>
                                        <div style={{ color: 'green', marginTop: '5px' }}>Correto: <strong>{item.options[item.correctAnswer]}</strong></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className={styles.cardFooter}>
                        <button className={styles.navBtn} onClick={() => navigate('/atividades')}>Voltar</button>
                        <button className={`${styles.navBtn} ${styles.btnNext}`} onClick={() => {
                            setShowReport(false);
                            setCurrentQuestionIndex(0);
                            setAnswers({});
                            setSelectedOption(null);
                        }}>Refazer Avaliação</button>
                    </div>
                </div>
            </main>
        </div>
    );
  }

  // --- Lógica das Perguntas (Quiz) ---
  const currentQuestion = moduleData.questions[currentQuestionIndex];
  const progressText = `Questão ${currentQuestionIndex + 1} de ${moduleData.questions.length}`;

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: index }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < moduleData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      const nextQ = moduleData.questions[currentQuestionIndex + 1];
      setSelectedOption(answers[nextQ.id] ?? null);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      const prevQ = moduleData.questions[currentQuestionIndex - 1];
      setSelectedOption(answers[prevQ.id] ?? null);
    }
  };

  const handleFinish = () => {
    setShowReport(true);
  };

  return (
    <div className={styles.pageLayout}>
      <div style={{ gridArea: 'header' }}><Header userName={userName} /></div>
      <div style={{ gridArea: 'sidebar' }}><Sidebar onLogout={() => navigate('/')} /></div>

      <main className={styles.mainContent}>
        <div className={styles.questionCard}>
            
            <div className={styles.cardHeader}>
                <span className={styles.moduleTitle}>{moduleData.topicTitle}</span>
                <span className={styles.questionCount}>{progressText}</span>
            </div>

            <h2 className={styles.questionText}>{currentQuestion.text}</h2>

            <div className={styles.optionsList}>
                {currentQuestion.options.map((option, index) => {
                    const letters = ["A", "B", "C", "D"];
                    const isSelected = selectedOption === index;
                    
                    return (
                        <button 
                            key={index} 
                            className={`${styles.optionButton} ${isSelected ? styles.selected : ''}`}
                            onClick={() => handleOptionClick(index)}
                        >
                            <span className={styles.optionLetter}>{letters[index]}</span>
                            {option}
                        </button>
                    );
                })}
            </div>

            <div className={styles.cardFooter}>
                <button 
                    className={`${styles.navBtn} ${styles.btnPrev}`}
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    style={{ opacity: currentQuestionIndex === 0 ? 0.5 : 1 }}
                >
                    <i className="fas fa-arrow-left"></i> Anterior
                </button>

                {currentQuestionIndex === moduleData.questions.length - 1 ? (
                     <button 
                        className={`${styles.navBtn} ${styles.btnFinish}`}
                        onClick={handleFinish}
                     >
                        Finalizar <i className="fas fa-check"></i>
                     </button>
                ) : (
                    <button 
                        className={`${styles.navBtn} ${styles.btnNext}`}
                        onClick={handleNext}
                    >
                        Próximo <i className="fas fa-arrow-right"></i>
                    </button>
                )}
            </div>

        </div>
      </main>
    </div>
  );
};

export default PagQuestions;