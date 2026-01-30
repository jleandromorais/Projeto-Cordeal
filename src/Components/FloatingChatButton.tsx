import React from 'react';
import styles from '../Styles/FloatingChatButton.module.css';

interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => {
  return (
    <button 
      className={styles.floatingBtn} 
      onClick={onClick}
      aria-label="Abrir Chat"
      title="Falar com a IA"
    >
      <i className="fas fa-comment-dots"></i>
    </button>
  );
};

export default FloatingChatButton;