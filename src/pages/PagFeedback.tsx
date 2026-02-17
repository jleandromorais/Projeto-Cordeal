import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/HeaderInit';
import ChatWidget from '../Components/ChatWidget';
import FloatingChatButton from '../Components/FloatingChatButton';
import styles from '../Styles/PagFeedback.module.css';

interface PagFeedbackProps {
  onLogout: () => void;
}

interface FeedbackItem {
  id: string;
  message: string;
  rating: number;
  category: string;
  createdAt: string;
}

const PagFeedback: React.FC<PagFeedbackProps> = ({ onLogout }) => {
  const { currentUser } = useAuth();
  const [userName, setUserName] = useState<string>(currentUser?.displayName || "...");
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Estados do formulário
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('geral');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Estados dos feedbacks anteriores
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      try {
        // Cache do nome
        const cachedName = localStorage.getItem(`userName_${currentUser.uid}`);
        if (cachedName) {
          setUserName(cachedName);
        } else if (currentUser.displayName) {
          setUserName(currentUser.displayName);
        }

        const token = await currentUser.getIdToken();
        const headers = { 'Authorization': `Bearer ${token}` };

        // Busca nome do perfil
        const userRes = await fetch(`${API_URL}/user/profile`, { headers });
        if (userRes.ok) {
          const userData = await userRes.json();
          const finalName = userData.name || 'Utilizador';
          setUserName(finalName);
          localStorage.setItem(`userName_${currentUser.uid}`, finalName);
        }

        // Busca feedbacks anteriores
        const feedbackRes = await fetch(`${API_URL}/feedback`, { headers });
        if (feedbackRes.ok) {
          const data = await feedbackRes.json();
          setFeedbacks(data);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoadingFeedbacks(false);
      }
    };

    fetchData();
  }, [currentUser, API_URL]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || rating === 0) {
      alert('Por favor, preencha a mensagem e escolha uma avaliação!');
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const token = await currentUser?.getIdToken();
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`${API_URL}/feedback`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: message.trim(),
          rating,
          category
        })
      });

      if (response.ok) {
        const newFeedback = await response.json();
        setSubmitSuccess(true);
        setMessage('');
        setRating(0);
        setCategory('geral');
        
        // Adiciona o novo feedback à lista
        setFeedbacks([newFeedback.feedback, ...feedbacks]);
        
        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        alert('Erro ao enviar feedback. Tente novamente.');
      }
    } catch (error) {
      console.error("Erro ao enviar feedback:", error);
      alert('Erro ao enviar feedback. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (currentRating: number, interactive: boolean = false) => {
    return (
      <div className={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`fas fa-star ${star <= currentRating ? styles.starFilled : styles.starEmpty}`}
            onClick={interactive ? () => setRating(star) : undefined}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.pageLayout}>
      <Sidebar onLogout={onLogout} />

      <main className={styles.mainContent}>
        <Header userName={userName} />

        <div className={styles.feedbackContainer}>
          <h1 className={styles.pageTitle}>Feedback</h1>
          <p className={styles.pageSubtitle}>
            Sua opinião é muito importante para nós! Ajude-nos a melhorar a plataforma.
          </p>

          {/* Formulário de Feedback */}
          <div className={styles.feedbackForm}>
            <h2 className={styles.formTitle}>Enviar Feedback</h2>
            
            <form onSubmit={handleSubmit}>
              {/* Categoria */}
              <div className={styles.formGroup}>
                <label htmlFor="category">Categoria</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={styles.select}
                >
                  <option value="geral">Geral</option>
                  <option value="bug">Reportar Bug</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="conteudo">Conteúdo</option>
                  <option value="usabilidade">Usabilidade</option>
                </select>
              </div>

              {/* Avaliação */}
              <div className={styles.formGroup}>
                <label>Avaliação</label>
                {renderStars(rating, true)}
                {rating > 0 && (
                  <p className={styles.ratingText}>
                    {rating === 1 && "Muito insatisfeito"}
                    {rating === 2 && "Insatisfeito"}
                    {rating === 3 && "Neutro"}
                    {rating === 4 && "Satisfeito"}
                    {rating === 5 && "Muito satisfeito"}
                  </p>
                )}
              </div>

              {/* Mensagem */}
              <div className={styles.formGroup}>
                <label htmlFor="message">Mensagem</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Conte-nos sua experiência, sugestões ou problemas..."
                  className={styles.textarea}
                  rows={6}
                  maxLength={1000}
                />
                <span className={styles.charCount}>{message.length}/1000</span>
              </div>

              {/* Botão de Envio */}
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting || !message.trim() || rating === 0}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Enviando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Enviar Feedback
                  </>
                )}
              </button>

              {submitSuccess && (
                <div className={styles.successMessage}>
                  <i className="fas fa-check-circle"></i> Feedback enviado com sucesso! Obrigado pela sua contribuição.
                </div>
              )}
            </form>
          </div>

          {/* Histórico de Feedbacks */}
          <div className={styles.feedbackHistory}>
            <h2 className={styles.historyTitle}>Seus Feedbacks Anteriores</h2>
            
            {loadingFeedbacks ? (
              <div className={styles.loading}>
                <i className="fas fa-spinner fa-spin"></i> Carregando...
              </div>
            ) : feedbacks.length === 0 ? (
              <div className={styles.emptyState}>
                <i className="fas fa-comments"></i>
                <p>Você ainda não enviou nenhum feedback.</p>
              </div>
            ) : (
              <div className={styles.feedbackList}>
                {feedbacks.map((feedback) => (
                  <div key={feedback.id} className={styles.feedbackCard}>
                    <div className={styles.feedbackHeader}>
                      <span className={styles.feedbackCategory}>
                        {feedback.category === 'geral' && '💬 Geral'}
                        {feedback.category === 'bug' && '🐛 Bug'}
                        {feedback.category === 'sugestao' && '💡 Sugestão'}
                        {feedback.category === 'conteudo' && '📚 Conteúdo'}
                        {feedback.category === 'usabilidade' && '🎨 Usabilidade'}
                      </span>
                      <span className={styles.feedbackDate}>
                        {new Date(feedback.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    {renderStars(feedback.rating)}
                    <p className={styles.feedbackMessage}>{feedback.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Chat Widget */}
      {isChatOpen && (
        <div style={{ position: 'fixed', bottom: '90px', right: '30px', zIndex: 1000 }}>
          <ChatWidget onClose={() => setIsChatOpen(false)} />
        </div>
      )}
      <FloatingChatButton onClick={toggleChat} />
    </div>
  );
};

export default PagFeedback;
