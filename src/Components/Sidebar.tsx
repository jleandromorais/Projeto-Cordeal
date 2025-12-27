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

// --- LISTA DE LINKS ATUALIZADA ---
const navLinks: NavLink[] = [
  { text: 'Início', icon: 'fas fa-home', path: '/dashboard' },
  { text: 'Atividades', icon: 'fas fa-tasks', path: '/atividades' },
  
  // NOVO ITEM ADICIONADO AQUI:
  { text: 'Minhas estatísticas', icon: 'fas fa-chart-line', path: '/estatisticas' },
  
  { text: 'Questões', icon: 'fas fa-file-alt', path: '/questoes' },
  { text: 'Feedback', icon: 'fas fa-exclamation-circle', path: '/feedback' },
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
            {/* Ícone muda dinamicamente: Seta ou Hamburguer */}
            <i className={isOpen ? "fas fa-chevron-left" : "fas fa-bars"}></i>
        </button>
        
        {/* Logo CORDEAL */}
        {isOpen && (
          <h1>
            <span className={styles.logoPart1}>COR</span>
            <span className={styles.logoPart2}>DEAL</span>
          </h1>
        )}
      </div>

      <nav className={styles.sidebarNav}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.text}>
              <a
                href="#"
                // Verifica se a rota atual é exatamente a do link para marcar como ativo
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
        <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }}>
          <i className="fas fa-sign-out-alt"></i>
          {isOpen && <span>Sair</span>}
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;