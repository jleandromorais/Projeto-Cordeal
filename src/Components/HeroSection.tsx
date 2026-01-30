import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/HeroSection.module.css';

// Importação apenas da logo
import logoImg from '../assets/img/logo.png';

interface HeroSectionProps {
  onEnterClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onEnterClick }) => {
  const navigate = useNavigate();

  const handleButtonClick = (action: string) => {
    console.log(`Botão ${action} clicado`);
    if (action === 'cadastrar') {
      navigate('/cadastro');
    } else if (action === 'entrar' && onEnterClick) {
      onEnterClick();
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        
        {/* Coluna da Esquerda: Textos e Botões */}
        <div className={styles.heroContentLeft}>
          <h1 className={styles.heroTitle}>CORDEAL</h1>
          
          <h2 className={styles.heroSubtitle}>
            CADA EXERCÍCIO É UM PASSO. CADA PASSO, UMA CONQUISTA.
          </h2>
          
          <p className={styles.heroDescription}>
            Cordeal é uma plataforma de aprendizagem gamificada que transforma o estudo em uma jornada envolvente. Com desafios interativos, trilhas personalizadas e ferramentas de monitoramento, estudantes aprendem com mais leveza e educadores acompanham o progresso com clareza.
          </p>
          
          <div className={styles.heroButtonsGroup}>
            <button className={styles.heroButton} onClick={() => handleButtonClick('entrar')}>
              Entrar
            </button>
            <button className={styles.heroButton} onClick={() => handleButtonClick('cadastrar')}>
              Cadastrar
            </button>
            <button className={styles.heroButton} onClick={() => handleButtonClick('saibamais')}>
              Saiba mais
            </button>
          </div>
        </div>

        {/* Coluna da Direita: Apenas a Logo */}
        <div className={styles.heroContentRight}>
            <img 
              src={logoImg} 
              alt="Logo Cordeal" 
              className={styles.logoImage} 
            />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;