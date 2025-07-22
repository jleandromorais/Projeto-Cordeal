import React from 'react';
import styles from '../Styles/Header.module.css';
import image2 from './image2.png';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={image2} alt="Logo" className={styles.logoIcon} />
        <span className={styles.logoText}>CORDEAL</span>
      </div>

      {/* Adicionamos uma classe à navegação */}
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          <li><a href="#o-que-e" className={styles.navItem}>Início</a></li>
          <li><a href="#quem-somos" className={styles.navItem}>Quem somos</a></li>
          <li><a href="#gamificacao" className={styles.navItem}>O que é</a></li>
          <li><a href="#home" className={styles.navItem}>Sobre</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;