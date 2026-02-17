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
      {/* Perfil do Usuário - estilo Figma (simples e discreto) */}
      <div className={styles.userProfile}>
        <span className={styles.userName}>{userName}</span>
        <div className={styles.avatarCircle}>
          <i className="fas fa-user"></i>
        </div>
      </div>
    </header>
  );
};

export default HeaderInit;