import React from 'react';
import styles from '../Styles/QuemSomos.module.css';

// Importar as fotos da equipe
import fotoAlessandra from '../assets/img/Ale.jfif';
import fotoThays from '../assets/img/Thay.jfif';
import fotoLeo from '../assets/img/Leo.png';

const QuemSomos: React.FC = () => {
  const equipe = [
   
    {
      nome: 'Alessandra Barbosa',
      cargo: 'Designer Figma & Dev Front-End',
      foto: fotoAlessandra,
      linkedin: 'https://www.linkedin.com/in/alessandra-barbosa-308072323'
    },
    {
      nome: 'Leandro Morais',
      cargo: 'Tech Lead & Dev Full Stack',
      foto: fotoLeo, // Espaço reservado para sua foto
      linkedin: 'https://www.linkedin.com/in/leandro-morais-luz/' // Adicione seu LinkedIn aqui
    },
    {
      nome: 'Thays Barbosa',
      cargo: 'Dev Full Stack',
      foto: fotoThays,
      linkedin: 'https://br.linkedin.com/in/thays-barbosa-332683318'
    }
  ];

  return (
    <>
      <section className={styles.contentSection}>
        <div className={styles.container}>
          
          {/* Título da Seção */}
          <div className={styles.sectionTitleWrapper}>
            <h1 className={styles.sectionTitle}>QUEM SOMOS</h1>
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

          {/* Seção da Equipe */}
          <div className={styles.teamSection}>
            <h2 className={styles.teamTitle}>NOSSA EQUIPE</h2>
            <div className={styles.teamGrid}>
              {equipe.map((membro, index) => (
                <div key={index} className={styles.teamCard}>
                  <div className={styles.photoContainer}>
                    {membro.foto ? (
                      <img 
                        src={membro.foto} 
                        alt={membro.nome} 
                        className={styles.teamPhoto}
                      />
                    ) : (
                      <div className={styles.placeholderPhoto}>
                        <i className="fas fa-user"></i>
                        <p>Foto em breve</p>
                      </div>
                    )}
                  </div>
                  <h3 className={styles.memberName}>{membro.nome}</h3>
                  <p className={styles.memberRole}>{membro.cargo}</p>
                  <a 
                    href={membro.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.linkedinButton}
                  >
                    <i className="fab fa-linkedin"></i> LinkedIn
                  </a>
                </div>
              ))}
            </div>
          </div>
          
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