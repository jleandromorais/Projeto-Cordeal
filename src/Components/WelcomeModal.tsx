// Em src/Components/WelcomeModal.tsx

import React, { useEffect } from 'react';
import styles from '../Styles/WelcomeModal.module.css';

// Definindo as props que o componente vai receber do pai
interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnter: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose, onEnter }) => {
  // A lógica de estado (useState) foi movida para o App.tsx
  // A lógica de localStorage também foi movida para o App.tsx

  // Efeito para travar o scroll da página (continua aqui pois depende do estado visual)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);


  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.welcomeModal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Fechar modal">
          <span aria-hidden="true">&times;</span>
        </button>

        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>Seja bem vindo(a).</h2>
          <div className={styles.modalBody}>
            <p>Faremos com você uma diagnose para verificar em quais conceitos você possui mais dificuldade, assim poderemos te ajudar desde a base. Então..</p>
            <p>Se você entrou no site</p>
            <p>Se aproveche, pode vir</p>
            <p>Pra fazer a diagnose</p>
            <p>Se tem dúvida aqui e ali</p>
            <p>É facin verificar</p>
            <p>Basta só clicar aqui!</p>
          </div>
          {/* O botão "Entrar" agora chama a função onEnter que veio do App.tsx */}
          <button className={styles.actionButton} onClick={onEnter}>Entrar</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;