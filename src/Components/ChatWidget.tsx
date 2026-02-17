import React, { useState, useRef, useEffect } from 'react';
import styles from '../Styles/ChatWidget.module.css';
import { useAuth } from '../AuthContext';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

interface ChatWidgetProps {
  onClose: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    // Mensagem inicial da IA
    { id: 1, text: "Olá! Como posso ajudar você hoje?", sender: 'ai' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // API URL from environment
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    if (!currentUser) return;

    const userMsg: Message = { id: Date.now(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const token = await currentUser.getIdToken();
      const response = await fetch(`${API_URL}/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: userMsg.text })
      });

      if (!response.ok) throw new Error("Erro servidor");
      const data = await response.json();
      
      const aiMsg: Message = { id: Date.now() + 1, text: data.reply || "Não entendi.", sender: 'ai' };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now(), text: "Erro ao conectar com a IA.", sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        {/* Título alterado para combinar com a imagem */}
        <span>NEVES</span>
        <button onClick={onClose} className={styles.closeBtn}>&times;</button>
      </div>
      
      <div className={styles.messagesArea}>
        {messages.map(msg => (
          // Container para a mensagem e o nome do remetente
          <div key={msg.id} className={`${styles.messageBlock} ${msg.sender === 'user' ? styles.userBlock : styles.aiBlock}`}>
            {/* Rótulo com o nome do remetente acima do balão */}
            <span className={styles.senderName}>
              {msg.sender === 'user' ? 'VOCÊ' : 'NEVES'}
            </span>
            {/* Balão da mensagem */}
            <div className={`${styles.messageBubble} ${msg.sender === 'user' ? styles.userBubble : styles.aiBubble}`}>
              {msg.text}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className={`${styles.messageBlock} ${styles.aiBlock}`}>
            <span className={styles.senderName}>NEVES</span>
            <div className={`${styles.messageBubble} ${styles.aiBubble}`}>Let me think...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        {/* Ícone de clipe */}
        <i className={`fas fa-paperclip ${styles.attachIcon}`}></i>
        <input 
          type="text" 
          className={styles.input}
          placeholder="Digite sua mensagem..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={isLoading}
        />
        {/* Botão de enviar para dispositivos móveis */}
        <button 
          onClick={handleSendMessage} 
          disabled={isLoading || !inputText.trim()}
          className={styles.sendButton}
          aria-label="Enviar mensagem"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;