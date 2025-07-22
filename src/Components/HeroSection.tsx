import React from 'react';
import styles from '../Styles/HeroSection.module.css';
import prof from '../Components/image2.png';
import numeros from "../assets/img/numeros.png";

const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__content}>
        <div className={styles.hero__text}>
          <h1 className={styles.hero__title}>CordEal</h1>
          <p className={styles.hero__subtitle}>Cada exercício é um passo. Cada passo, uma conquista.</p>
          
          {/* Texto da descrição atualizado para corresponder à imagem */}
          <p className={styles.hero__description}>
            Cordeal é uma plataforma de aprendizagem gamificada que transforma o estudo em uma jornada envolvente. 
            Com desafios interativos, trilhas personalizadas e ferramentas de monitoramento, estudantes aprendem 
            com mais leveza e educadores acompanham o progresso com clareza.
          </p>

          <div className={styles.hero__buttons}>
            <button className={styles.button}>Entrar</button>
            <button className={styles.button}>Cadastrar</button>
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