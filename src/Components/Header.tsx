import React from 'react';
import styles from '../Styles/Header.module.css';
import image2 from './image2.png'; // Importando a imagem

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={image2} alt="Logo" className={styles.logoIcon} />
        <span className={styles.logoText}>CORDEAL</span>
      </div>

      <nav>
        <ul className={styles.navList}>
          <li><a href="#o-que-e" className={styles.navItem}>O que é</a></li>
          <li><a href="#quem-somos" className={styles.navItem}>Quem somos</a></li>
          <li><a href="#gamificacao" className={styles.navItem}>Gamificação</a></li>
          <li><a href="#home" className={styles.navItem}>Home</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
