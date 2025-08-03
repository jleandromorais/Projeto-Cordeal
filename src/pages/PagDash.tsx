import React from 'react';

// Importe os componentes que formam a página
import Sidebar from '../Components/Sidebar'; // O seu componente que você já tem
import Header from '../Components/Header';   // O componente que acabamos de criar
import Dashboard from '../Components/Dashboard'; // O conteúdo principal da página

// Importe o CSS para o layout da página
import styles from '../Styles/PagDash.module.css';

// --- TIPOS ---
interface PagDashProps {
  onLogout: () => void;
}

const PagDash: React.FC<PagDashProps> = ({ onLogout }) => {
  return (
    <div className={styles.pageLayout}>
      {/* A Sidebar é importada e recebe a função de logout */}
      <Sidebar onLogout={onLogout} />

      <main className={styles.mainContent}>
        <Header />
        
        <div className={styles.dashboardContent}>
          {/* O conteúdo específico da página é renderizado aqui */}
          <Dashboard />
        </div>
      </main>
    </div>
  );
}

export default PagDash;