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
            Cordeal é uma plataforma de aprendizagem gamificada que transforma o estudo em uma experiência dinâmica e motivadora. Por meio de trilhas interativas e personalizadas, os estudantes avançam no conteúdo de forma leve e envolvente. Além disso, a plataforma oferece ferramentas de acompanhamento que permitem aos educadores monitorar o desempenho e o progresso dos estudantes com clareza e eficiência.
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