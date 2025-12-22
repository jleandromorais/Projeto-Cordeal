// src/Components/FloatingChatButton.tsx
import React, { useState } from 'react';
import ChatWidget from './ChatWidget';
import styles from '../Styles/FloatingChatButton.module.css';

const FloatingChatButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Botão Flutuante (FAB) */}
      <button 
        className={styles.fab} 
        onClick={() => setIsChatOpen(!isChatOpen)}
        aria-label="Abrir Chat com IA"
      >
        <i className={`fas ${isChatOpen ? 'fa-times' : 'fa-comment'}`}></i>
      </button>

      {/* Renderização Condicional do Widget */}
      {isChatOpen && (
        <ChatWidget onClose={() => setIsChatOpen(false)} />
      )}
    </>
  );
};

export default FloatingChatButton;