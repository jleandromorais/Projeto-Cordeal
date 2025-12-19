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
    { id: 1, text: "Olá! Sou a IA do Cordeal. Como posso ajudar nos teus estudos hoje?", sender: 'ai' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !currentUser) return;

    const userMsg: Message = { id: Date.now(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const token = await currentUser.getIdToken();
      const response = await fetch('http://localhost:3001/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: userMsg.text })
      });

      const data = await response.json();
      
      const aiMsg: Message = { id: Date.now() + 1, text: data.reply || "Desculpa, não entendi.", sender: 'ai' };
      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      console.error("Erro:", error);
      setMessages(prev => [...prev, { id: Date.now(), text: "Erro ao conectar com a IA.", sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <span>IA Cordeal ✨</span>
        <button onClick={onClose} className={styles.closeBtn}>&times;</button>
      </div>
      
      <div className={styles.messagesArea}>
        {messages.map(msg => (
          <div key={msg.id} className={`${styles.message} ${msg.sender === 'user' ? styles.userMsg : styles.aiMsg}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className={styles.message + ' ' + styles.aiMsg}>Digitando...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        <input 
          type="text" 
          className={styles.input}
          placeholder="Pergunte algo..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={isLoading}
        />
        <button onClick={handleSendMessage} className={styles.sendBtn} disabled={isLoading}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;