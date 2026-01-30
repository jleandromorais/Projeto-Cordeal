import React from 'react';
import styles from '../Styles/FunctionalitiesSection.module.css';

// --- IMPORTANDO AS IMAGENS DA SUA PASTA ASSETS/IMG ---
import iconFeedback from '../assets/img/feedback.png';
import iconReforco from '../assets/img/reforco.png';
import iconGamificacao from '../assets/img/gamificacao.png';
import iconForum from '../assets/img/forum.png';
import iconNeves from '../assets/img/neves.png';

interface FeatureCardData {
  iconSource: string;
  title: string;
  description: string;
}

const featuresData: FeatureCardData[] = [
  {
    iconSource: iconFeedback,
    title: 'Área de feedback',
    description: 'Este espaço é reservado para você compartilhar suas opiniões sobre as aulas, conteúdos, professores ou a plataforma. Seu feedback é muito importante para que possamos melhorar continuamente sua experiência de aprendizado. Fique à vontade para deixar sugestões, elogios ou críticas construtivas.',
  },
  {
    iconSource: iconReforco,
    title: 'Reforço direcionado',
    description: 'Com base nas dificuldades identificadas, o estudante recebe atividades personalizadas ao longo do percurso de aprendizagem. A plataforma analisa seu desempenho e sugere conteúdos focados nos pontos que precisam de reforço.',
  },
  {
    iconSource: iconGamificacao,
    title: 'Gamificação',
    description: 'O sistema de gamificação é voltado para o aprendizado contínuo/evolutivo, guiando o estudante desde a base dos conteúdos até o nível mais complexo. O estudante ganha pontos a cada atividade concluída e mais pontos a cada fase feita.',
  },
  {
    iconSource: iconForum,
    title: 'Fórum de discussão',
    description: 'Este espaço é destinado à interação entre alunos e professores, promovendo a troca de ideias, o esclarecimento de dúvidas e o debate sobre os conteúdos abordados. A participação contribui para o enriquecimento do aprendizado e o fortalecimento da comunidade acadêmica.',
  },
  {
    iconSource: iconNeves,
    title: 'Neves',
    description: 'Este recurso foi desenvolvido para auxiliar os estudantes ao longo da jornada de aprendizagem, oferecendo apoio com dúvidas, explicações de conteúdo, orientações sobre atividades e uso da plataforma. Utilize sempre que precisar de suporte rápido e personalizado.',
  },
];

const FunctionalitiesSection: React.FC = () => {
  return (
    <section className={styles.functionalitiesSection}>
      <div className={styles.container}>
        <div className={styles.sectionTitleWrapper}>
          <h2 className={styles.sectionTitle}>NOSSAS FUNCIONALIDADES</h2>
        </div>

        <div className={styles.cardsGrid}>
          {featuresData.map((feature, index) => (
            <div className={styles.featureCard} key={index}>
              <div className={styles.iconBackground}>
                {/* Aqui a imagem é renderizada */}
                <img 
                  src={feature.iconSource} 
                  alt={`Ícone ${feature.title}`} 
                  className={styles.cardIconImage} 
                />
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunctionalitiesSection;