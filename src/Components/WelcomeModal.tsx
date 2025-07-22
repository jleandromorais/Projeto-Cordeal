import React, { useState, useEffect, useCallback } from 'react';
import styles from '../Styles/WelcomeModal.module.css';

const WelcomeModal: React.FC = () => {
  // ALTERAÇÃO: O modal agora começa aberto (true) por padrão.
  const [isOpen, setIsOpen] = useState(true);

  // Função para fechar o modal
  const handleClose = useCallback(() => {
    setIsOpen(false);
    // REMOVIDO: A linha abaixo que salvava no localStorage foi removida.
    // localStorage.setItem('hasSeenWelcomeModal', 'true');
  }, []);

  // REMOVIDO: O useEffect que verificava o localStorage não é mais necessário,
  // pois o estado inicial `isOpen` já é `true`.

  // useEffect para controlar os efeitos colaterais (scroll e tecla ESC)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
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
  }, [isOpen, handleClose]);

  const handleEnter = () => {
    console.log('Iniciando diagnóstico...');
    handleClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.welcomeModal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose} aria-label="Fechar modal">
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

          <button className={styles.actionButton} onClick={handleEnter}>Entrar</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;