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
            Somos estudantes do 4º período de Análise e Desenvolvimento de Sistemas na CESAR School e idealizadores deste projeto. Nossa missão é clara: demonstrar como a tecnologia, quando aplicada com propósito, pode transformar o aprendizado em uma experiência prática e inteligente.
          </p>

          <p className={styles.bodyText}>
            O projeto nasceu de um desafio proposto pelo professor João Neves durante a monitoria de Matemática para Programação no 2º período. Como também enfrentamos as complexidades da matéria, decidimos transformar nossas dificuldades em solução. O resultado é uma plataforma feita por alunos, para alunos, unindo teoria e prática em um ambiente interativo.
          </p>

          <p className={styles.bodyText}>
            Aqui, aplicamos nossos conhecimentos em desenvolvimento para oferecer conteúdos didáticos e ferramentas que simplificam conceitos abstratos. Mais do que um trabalho acadêmico, este site é um ecossistema de apoio e inovação. Esperamos que ele seja seu aliado nos estudos e que ajude você a encarar o cálculo sob uma nova perspectiva.
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