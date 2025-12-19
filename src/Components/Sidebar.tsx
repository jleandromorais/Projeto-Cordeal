import React, { useState } from 'react';
import styles from '../Styles/Sidebar.module.css';

interface NavLink {
  text: string;
  icon: string;
}

interface SidebarProps {
  onLogout: () => void;
}

const navLinks: NavLink[] = [
  { text: 'Início', icon: 'fas fa-home' },
  { text: 'Questões', icon: 'fas fa-file-alt' },
  { text: 'Feedback', icon: 'fas fa-exclamation-circle' },
  { text: 'Reforço direcionado', icon: 'fas fa-lightbulb' },
];

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const [activeLink, setActiveLink] = useState<string>('Início');
  // Estado para controlar se está aberto ou fechado
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`${styles.sidebar} ${isOpen ? '' : styles.collapsed}`}>
      
      <div className={styles.sidebarHeader}>
        {/* Botão dos 3 pontinhos (Toggle) */}
        <button 
            className={styles.toggleBtn} 
            onClick={() => setIsOpen(!isOpen)}
            title={isOpen ? "Fechar menu" : "Abrir menu"}
        >
            <i className="fas fa-ellipsis-v"></i>
        </button>
        
        {/* O Título só aparece se estiver aberto */}
        {isOpen && <h1>CORDEAL</h1>}
      </div>

      <nav className={styles.sidebarNav}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.text}>
              <a
                href="#"
                className={`${styles.navLink} ${activeLink === link.text ? styles.active : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink(link.text);
                }}
                title={link.text} // Mostra o nome ao passar o mouse (útil quando fechado)
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