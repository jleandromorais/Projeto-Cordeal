import React from 'react';
import styles from '../Styles/FunctionalitiesSection.module.css';

// 1. Interface para definir a "forma" dos dados de cada card.
interface FeatureCardData {
  iconClass: string;
  title: string;
  description: string;
}

// 2. O array de dados agora é tipado com a interface criada.
const featuresData: FeatureCardData[] = [
  {
    iconClass: 'ph-chat-text-fill',
    title: 'Área de feedback',
    description: 'Este espaço é reservado para você compartilhar suas opiniões sobre as aulas, conteúdos, professores ou a plataforma.',
  },
  {
    iconClass: 'ph-lightbulb-fill',
    title: 'Reforço direcionado',
    description: 'Com base nas dificuldades identificadas, o estudante recebe atividades personalizadas ao longo do percurso de aprendizagem.',
  },
  {
    iconClass: 'ph-game-controller-fill',
    title: 'Gamificação',
    description: 'Inspirado no Duolingo, o sistema de gamificação funciona de forma aprendizado baseada.',
  },
  {
    iconClass: 'ph-users-three-fill',
    title: 'Fórum de discussão',
    description: 'Este espaço é destinado à interação entre alunos e professores, promovendo a troca de ideias e o esclarecimento de dúvidas.',
  },
  {
    iconClass: 'ph-brain-fill',
    title: 'Neves',
    description: 'Este recurso foi desenvolvido para auxiliar os estudantes ao longo da jornada de aprendizagem, oferecendo apoio com dúvidas.',
  },
];

// 3. O componente é tipado como React.FC (Functional Component).
const FunctionalitiesSection: React.FC = () => {
  return (
    <section className={styles.functionalitiesSection}>
      <div className={styles.container}>
        <div className={styles.sectionTitleWrapper}>
          <h2 className={styles.sectionTitle}>Nossas funcionalidades</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className={styles.cardsGrid}>
          {featuresData.map((feature, index) => (
            // O TypeScript infere que `feature` é do tipo `FeatureCardData`.
            <div className={styles.featureCard} key={index}>
              <div className={styles.iconBackground}>
                <i className={feature.iconClass}></i>
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