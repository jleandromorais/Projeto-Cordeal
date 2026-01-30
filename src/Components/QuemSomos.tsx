import React from 'react';
import styles from '../Styles/QuemSomos.module.css';

const QuemSomos: React.FC = () => {
  return (
    <>
      <section className={styles.contentSection}>
        <div className={styles.container}>
          
          {/* Título da Seção */}
          <div className={styles.sectionTitleWrapper}>
            <h1 className={styles.sectionTitle}>QUEM SOMOS</h1>
            {/* O sublinhado foi removido para ficar igual à foto */}
          </div>

          {/* Textos descritivos */}
          <p className={styles.bodyText}>
            Estudantes do 2º período do curso de Análise e Desenvolvimento de Sistemas da Cesar School, somos os responsáveis pelo desenvolvimento deste projeto, criado com o objetivo de mostrar como a tecnologia pode ser usada de forma prática e inteligente para apoiar o aprendizado.
          </p>

          <p className={styles.bodyText}>
            A ideia do site surgiu a partir de uma proposta do professor João Neves, que nos desafiou a pensar em soluções reais para os desafios enfrentados na disciplina de Matemática para programação. Como muitos colegas, também passamos por essas dificuldades – e foi justamente essa vivência que nos inspirou a criar uma plataforma feita por alunos, para alunos.
          </p>

          <p className={styles.bodyText}>
            Reunimos nossos conhecimentos em tecnologia e programação para desenvolver um ambiente interativo, com conteúdos didáticos, exemplos práticos e ferramentas que facilitam a compreensão dos conceitos. Nosso foco é tornar o processo de aprendizado mais leve, acessível e eficiente, por meio da colaboração e da inovação.
          </p>

          <p className={styles.bodyText}>
            Mais do que um projeto acadêmico, este site é um espaço de apoio, troca e construção conjunta. Esperamos que ele ajude você a estudar, revisar e, quem sabe, até gostar de cálculo.
          </p>
          
        </div>
      </section>
      
      {/* Faixa de rodapé azul */}
      <footer className={styles.footerBand}>
        {/* Conteúdo do rodapé se necessário */}
      </footer>
    </>
  );
};

export default QuemSomos;