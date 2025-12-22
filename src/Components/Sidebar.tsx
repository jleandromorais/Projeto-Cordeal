// src/Components/Sidebar.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importe useNavigate e useLocation
import styles from '../Styles/Sidebar.module.css';

interface NavLink {
  text: string;
  icon: string;
  path: string; // Adicionei o campo path
}

interface SidebarProps {
  onLogout: () => void;
}

const navLinks: NavLink[] = [
  { text: 'Início', icon: 'fas fa-home', path: '/dashboard' },
  { text: 'Atividades', icon: 'fas fa-tasks', path: '/atividades' }, // Novo Link
  { text: 'Questões', icon: 'fas fa-file-alt', path: '/questoes' }, // Exemplo
  { text: 'Feedback', icon: 'fas fa-exclamation-circle', path: '/feedback' },
];

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Para saber em qual página estamos

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
            <i className="fas fa-ellipsis-v"></i>
        </button>
        
        {isOpen && <h1>CORDEAL</h1>}
      </div>

      <nav className={styles.sidebarNav}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.text}>
              <a
                href="#"
                // Verifica se a rota atual começa com o path do link para marcar como ativo
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