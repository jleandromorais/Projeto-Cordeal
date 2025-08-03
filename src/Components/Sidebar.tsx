import React, { useState } from 'react';
import styles from '../Styles/Sidebar.module.css';

// --- INTERFACES DE TIPO ---
interface NavLink {
  text: string;
  icon: string;
}

interface SidebarProps {
  onLogout: () => void; // A função de logout é recebida como prop
}

const navLinks: NavLink[] = [
  { text: 'Início', icon: 'fas fa-home' },
  { text: 'Questões', icon: 'fas fa-file-alt' },
  { text: 'Feedback', icon: 'fas fa-exclamation-circle' },
  { text: 'Reforço direcionado', icon: 'fas fa-lightbulb' },
];

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const [activeLink, setActiveLink] = useState<string>('Início');

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <i className="fas fa-bars-staggered"></i>
        <h1>CORDEAL</h1>
      </div>
      <nav className={styles.sidebarNav}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.text}>
              <a
                href="#"
                className={`${styles.navLink} ${activeLink === link.text ? styles.active : ''}`}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  setActiveLink(link.text);
                }}
              >
                <i className={link.icon}></i>
                <span>{link.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.sidebarFooter}>
        <a href="#" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Sair</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;