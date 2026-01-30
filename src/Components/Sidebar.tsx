import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../Styles/Sidebar.module.css';

interface NavLink {
  text: string;
  icon: string;
  path: string;
}

interface SidebarProps {
  onLogout: () => void;
}

const navLinks: NavLink[] = [
  { text: 'Início', icon: 'fas fa-home', path: '/dashboard' },
  { text: 'Atividades', icon: 'fas fa-tasks', path: '/atividades' },
  { text: 'Minhas estatísticas', icon: 'fas fa-chart-line', path: '/estatisticas' },
  { text: 'Questões', icon: 'fas fa-clipboard-list', path: '/questoes' },
  { text: 'Feedback', icon: 'fas fa-comment-alt', path: '/feedback' },
];

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? '' : styles.collapsed}`}>
      
      <div className={styles.sidebarHeader}>
        <button 
            className={styles.toggleBtn} 
            onClick={() => setIsOpen(!isOpen)}
            title={isOpen ? "Fechar menu" : "Abrir menu"}
        >
            <i className="fas fa-bars"></i>
        </button>
        
        {isOpen && (
          <h1 className={styles.logoText}>CORDEAL</h1>
        )}
      </div>

      <nav className={styles.sidebarNav}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.text}>
              <a
                href="#"
                className={`${styles.navLink} ${location.pathname === link.path ? styles.active : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.path);
                }}
                title={link.text}
              >
                <i className={link.icon}></i>
                {isOpen && <span>{link.text}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.sidebarFooter}>
        <button onClick={onLogout} className={styles.logoutBtn}>
          <i className="fas fa-sign-out-alt"></i>
          {isOpen && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;