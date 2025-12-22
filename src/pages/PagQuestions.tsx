// src/pages/PagQuestions.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

import Sidebar from '../Components/Sidebar';
import Header from '../Components/HeaderInit';
import styles from '../Styles/PagQuestions.module.css';

// Interface para definir como é uma questão
interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // Índice da resposta correta (0, 1, 2, 3)
}

// Dados simulados (Mock) - Em um app real, viria do banco de dados
const mockQuestions: Record<string, Question[]> = {
  "1": [ // Módulo 1
    { id: 1, text: "Quanto é 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: 1 },
    { id: 2, text: "Qual o resultado de 10 - 4?", options: ["5", "6", "7", "4"], correctAnswer: 1 },
    { id: 3, text: "Quanto é 3 x 3?", options: ["9", "6", "12", "33"], correctAnswer: 0 },
  ],
  "2": [ // Módulo 2
    { id: 101, text: "Qual fração representa a metade?", options: ["1/3", "1/4", "1/2", "2/1"], correctAnswer: 2 },
  ]
};

const PagQuestions: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>(); // Pega o ID da URL
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // Estado
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // Salva as respostas
  const [userName, setUserName] = useState("...");

  // Carrega nome do usuário (igual outras páginas)
  useEffect(() => {
    if (currentUser) {
        // ... (Lógica de fetch user profile se necessário)
        setUserName("Utilizador");
    }
  }, [currentUser]);

  // Carrega as questões do módulo atual
  const questions = moduleId && mockQuestions[moduleId] ? mockQuestions[moduleId] : [];
  const currentQuestion = questions[currentQuestionIndex];

  // Se não houver questões para esse módulo
  if (questions.length === 0) {
    return (
        <div className={styles.pageLayout}>
            <div style={{gridArea: 'header'}}><Header userName={userName} /></div>
            <div style={{gridArea: 'sidebar'}}><Sidebar onLogout={() => {}} /></div>
            <main className={styles.mainContent}>
                <h2>Módulo não encontrado ou sem questões.</h2>
                <button onClick={() => navigate('/atividades')}>Voltar</button>
            </main>
        </div>
    );
  }

  // Handlers
  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    // Salva a resposta no estado global de respostas
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: index }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      // Recupera resposta se já tiver respondido antes, senão limpa
      const nextQ = questions[currentQuestionIndex + 1];
      setSelectedOption(answers[nextQ.id] ?? null);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      // Recupera a resposta anterior
      const prevQ = questions[currentQuestionIndex - 1];
      setSelectedOption(answers[prevQ.id] ?? null);
    }
  };

  const handleFinish = () => {
    console.log("Respostas Finais:", answers);
    alert("Parabéns! Você concluiu o módulo.");
    navigate('/atividades'); // Volta para a tela de módulos
  };

  const progressText = `Questão ${currentQuestionIndex + 1} de ${questions.length}`;

  return (
    <div className={styles.pageLayout}>
      {/* Header e Sidebar */}
      <div style={{ gridArea: 'header' }}>
        <Header userName={userName} />
      </div>
      <div style={{ gridArea: 'sidebar' }}>
         {/* Passamos uma função vazia pro logout só pra não quebrar, ou passe a props real se tiver */}
         <Sidebar onLogout={() => navigate('/')} />
      </div>

      <main className={styles.mainContent}>
        
        <div className={styles.questionCard}>
            
            {/* Cabeçalho do Card */}
            <div className={styles.cardHeader}>
                <span className={styles.moduleTitle}>Módulo {moduleId}</span>
                <span className={styles.questionCount}>{progressText}</span>
            </div>

            {/* Pergunta */}
            <h2 className={styles.questionText}>{currentQuestion.text}</h2>

            {/* Opções */}
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

            {/* Navegação */}
            <div className={styles.cardFooter}>
                <button 
                    className={`${styles.navBtn} ${styles.btnPrev}`}
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    style={{ opacity: currentQuestionIndex === 0 ? 0.5 : 1, cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer' }}
                >
                    <i className="fas fa-arrow-left"></i> Anterior
                </button>

                {currentQuestionIndex === questions.length - 1 ? (
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