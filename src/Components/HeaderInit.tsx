
import React from 'react';
// ✅ CORREÇÃO: O caminho correto para o ficheiro de estilos
import styles from '../Styles/HeaderInit.module.css';

const HeaderInit: React.FC = () => {
  return (
    <header className={styles.mainHeader}>
      <div className={styles.userProfile}>
        <span>Alessandra</span>
        <i className="fas fa-user-circle"></i>
      </div>
    </header>
  );
};

export default HeaderInit;