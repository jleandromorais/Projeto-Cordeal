import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.mainHeader}>
      <div className={styles.userProfile}>
        <span>Alessandra</span>
        <i className="fas fa-user-circle"></i>
      </div>
    </header>
  );
};

export default Header;