// src/Components/HeaderInit.tsx
import React from 'react';
import styles from '../Styles/HeaderInit.module.css';

// 1. Definir a interface de props que este componente espera
interface HeaderInitProps {
  userName: string;
}

// 2. Receber { userName } como prop
const HeaderInit: React.FC<HeaderInitProps> = ({ userName }) => {
  return (
    <header className={styles.mainHeader}>
      <div className={styles.userProfile}>
        {/* 3. Usar a prop 'userName' que veio do "pai" */}
        <span>{userName}</span>
        <i className="fas fa-user-circle"></i>
      </div>
    </header>
  );
};

export default HeaderInit;