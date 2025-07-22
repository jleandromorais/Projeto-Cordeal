import React from 'react';
import styles from '../Styles/AboutSection.module.css';
// Importe as duas imagens
import avatarImage from '../assets/img/avatar.png'; 
import numerosImage from '../assets/img/numeros.png';

const AboutSection: React.FC = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.textColumn}>
          <div className={styles.sectionTitleWrapper}>
            <h2 className={styles.sectionTitle}>O Que É</h2>
            <div className={styles.titleUnderline}></div>
          </div>
          <p className={styles.descriptionParagraph}>
            O projeto foi desenvolvido com o objetivo de auxiliar estudantes durante o processo de aprendizagem, fazendo com que esse exercício seja leve e proveitoso. Aqui terão a oportunidade de poder extrair o melhor de si e acompanhar seu rendimento enquanto se diverte.
          </p>
          <h3 className={styles.cordealHeading}>CORDEAL</h3>
          <p className={styles.descriptionParagraph}>
            O nome se deu a partir de representações significativas para os desenvolvedores. Trata-se da junção das palavras <strong className={styles.highlight}>"cardinal"</strong>, fazendo alusão aos números, <strong className={styles.highlight}>"cordial"</strong>, trazendo a gentileza, respeito e educação, e <strong className={styles.highlight}>"cordel"</strong>, representando regionalidade e homenageando o idealizador do projeto, professor João Neves, que é entusiasta nesse tipo de arte.
          </p>
          <p className={styles.descriptionParagraph}>
            Professor de exatas e amante de arte, João Neves é a cara do Cordeal. Sendo representado a partir da ilustração que faz parte da composição da nossa identidade visual com muito carisma e personalidade.
          </p>
        </div>
        
        {/* --- COLUNA DA IMAGEM ATUALIZADA --- */}
        <div className={styles.imageColumn}>
          {/* Este novo container é essencial para o posicionamento */}
          <div className={styles.imageStack}>
            {/* Imagem de fundo */}
            <img 
              src={numerosImage} 
              alt="Números de fundo" 
              className={styles.backgroundImage} 
            />
            {/* Imagem da frente (avatar) */}
            <img 
              src={avatarImage} 
              alt="Avatar CordEal" 
              className={styles.foregroundImage} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;