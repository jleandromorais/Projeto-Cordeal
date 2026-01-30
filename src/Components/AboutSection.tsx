import React from 'react';
import styles from '../Styles/AboutSection.module.css';

// Importação apenas da logo
import logoImage from '../assets/img/logo.png'; 

const AboutSection: React.FC = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        
        {/* Coluna de Texto */}
        <div className={styles.textColumn}>
          
          <div className={styles.sectionTitleWrapper}>
            <h2 className={styles.sectionTitle}>O QUE É</h2>
          </div>
          
          <p className={styles.descriptionParagraph}>
            O projeto foi desenvolvido com o objetivo de auxiliar estudantes durante o processo de aprendizagem, fazendo com que esse exercício seja leve e proveitoso. Aqui terão a oportunidade de poder extrair o melhor de si e acompanhar seu rendimento enquanto se diverte.
          </p>
          
          <h3 className={styles.cordealHeading}>CORDEAL</h3>
          
          <p className={styles.descriptionParagraph}>
            O nome se deu a partir de representações significativas para os desenvolvedores. Trata-se da junção das palavras "cardinal", fazendo alusão aos números, "cordial", trazendo a gentileza, respeito e educação, e "cordel", representando regionalidade e homenageando o idealizador do projeto, professor João Neves, que é entusiasta nesse tipo de arte.
          </p>
          
          <p className={styles.descriptionParagraph}>
            Professor de exatas e amante de arte, João Neves é a cara do Cordeal. Sendo representado a partir da ilustração que faz parte da composição da nossa identidade visual com muito carisma e personalidade.
          </p>
        </div>
        
        {/* Coluna da Imagem (Apenas Logo) */}
        <div className={styles.imageColumn}>
            <img 
              src={logoImage} 
              alt="Logo João Neves - Cordeal" 
              className={styles.logoImage} 
            />
        </div>

      </div>
    </section>
  );
};

export default AboutSection;