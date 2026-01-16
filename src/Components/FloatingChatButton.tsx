import React from 'react';
import styles from '../Styles/FloatingChatButton.module.css';

// Interface para definir que o botão espera receber uma função onClick
interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.floatingButton} onClick={onClick}>
      💬
    </button>
  );
};

export default FloatingChatButton;