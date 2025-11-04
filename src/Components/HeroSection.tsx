// Em src/Components/HeroSection.tsx

import React from 'react';
// ✅ 1. Importar o hook useNavigate
import { useNavigate } from 'react-router-dom';
// CORREÇÃO: Mudando para caminhos absolutos
import styles from '/src/Styles/HeroSection.module.css';
import prof from '/src/assets/img/avatar.png';
import numeros from "/src/assets/img/numeros.png";

// Defina as props que o componente espera receber
interface HeroSectionProps {
  onEnterClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onEnterClick }) => {
  // ✅ 2. Inicializar o hook
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.hero__content}>
        <div className={styles.hero__text}>
          <h1 className={styles.hero__title}>CordEal</h1>
          <p className={styles.hero__subtitle}>Cada exercício é um passo. Cada passo, uma conquista.</p>
          <p className={styles.hero__description}>
            Cordeal é uma plataforma de aprendizagem gamificada que transforma o estudo em uma jornada envolvente. 
            Com desafios interativos, trilhas personalizadas e ferramentas de monitoramento, estudantes aprendem 
            com mais leveza e educadores acompanham o progresso com clareza.
          </p>
          <div className={styles.hero__buttons}>
            {/* O botão "Entrar" agora chama a função recebida via props */}
            <button className={styles.button} onClick={onEnterClick}>Entrar</button>
            
            {/* ✅ 3. Adicionar o onClick para navegar para a rota de cadastro */}
            <button 
              className={styles.button} 
              onClick={() => navigate('/cadastro')}
            >
              Cadastrar
            </button>
            
            <button className={styles.button}>Saiba mais</button>
          </div>
        </div>
        <div className={styles.hero__image}>
          <div className={styles.avatarGroup}>
            <img src={numeros} alt="Números Flutuantes" className={styles.floatingNumbers} />
            <img src={prof} alt="Avatar CordEal" className={styles.hero__avatar} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

