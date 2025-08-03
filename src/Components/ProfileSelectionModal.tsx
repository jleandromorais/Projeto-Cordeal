import React, { useEffect } from 'react';
import styles from '../Styles/ProfileSelectionModal.module.css';

interface ProfileSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileSelect: (role: string) => void;
}

const ProfileSelectionModal: React.FC<ProfileSelectionModalProps> = ({ isOpen, onClose, onProfileSelect }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSelect = (role: string) => {
    onProfileSelect(role);
    onClose();
  };

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.active : ''}`} onClick={onClose}>
      <div className={styles.selectionModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClose} aria-label="Fechar">&times;</button>
        </div>
        <div className={styles.modalBody}>
          <h2 className={styles.modalQuestion}>Você é estudante ou professor?</h2>
          <div className={styles.buttonGroup}>
            <button className={styles.actionButton} onClick={() => handleSelect('student')}>Estudante</button>
            <button className={styles.actionButton} onClick={() => handleSelect('teacher')}>Professor</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelectionModal;