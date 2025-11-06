import React from 'react';

// Importe os seus componentes (sem .tsx)
import Sidebar from '../Components/Sidebar';
import Header from '../Components/HeaderInit'; 
import Dashboard from '../Components/Dashboard'; // Esta é a linha que dava o erro

// Importe o CSS para o layout
import styles from '../Styles/PagDash.module.css';

// --- TIPOS ---
interface PagDashProps {
  onLogout: () => void;
}

const PagDash: React.FC<PagDashProps> = ({ onLogout }) => {
  return (
    // O div principal agora serve apenas como um invólucro
    <div className={styles.pageLayout}>
      
      {/* Header e Sidebar agora estão no mesmo nível */}
      <Header />
      <Sidebar onLogout={onLogout} />

      {/* O <main> é o contentor do conteúdo que é empurrado para o lugar certo pelo CSS */}
      <main className={styles.mainContent}>
        <Dashboard />
      </main>
      
    </div>
  );
}

export default PagDash;