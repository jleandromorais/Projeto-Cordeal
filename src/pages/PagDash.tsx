// src/pages/PagDash.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext'; 

import Sidebar from '../Components/Sidebar';
import Header from '../Components/HeaderInit';
import { Dashboard } from '../Components/Dashboard';
import styles from '../Styles/PagDash.module.css';

interface PagDashProps {
  onLogout: () => void;
}

const PagDash: React.FC<PagDashProps> = ({ onLogout }) => {
  const { currentUser } = useAuth();
  const [userName, setUserName] = useState<string>("...");

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const token = await currentUser.getIdToken();
          const authHeader = { 'Authorization': `Bearer ${token}` };
          const API_URL = 'http://localhost:3001/api';

          // CORREÇÃO 1: A rota correta é /user/profile
          const userRes = await fetch(`${API_URL}/user/profile`, { headers: authHeader });
          
          if (!userRes.ok) throw new Error('Falha ao buscar dados');
          
          const userData = await userRes.json();
          
          // CORREÇÃO 2: O back-end envia 'name', não 'nome'
          // Se não houver nome, mostra 'Utilizador'
          setUserName(userData.name || 'Utilizador'); 

        } catch (error) {
          console.error("Erro:", error);
          setUserName("Utilizador");
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

 return (
  <div className={styles.pageLayout}>
    
    {/* Header ocupa a área 'header' */}
    <div style={{ gridArea: 'header' }}>
      <Header userName={userName} /> 
    </div>
    
    {/* Sidebar ocupa a área 'sidebar' */}
    <div style={{ gridArea: 'sidebar' }}>
       <Sidebar onLogout={onLogout} />
    </div>

    {/* Dashboard ocupa a área 'main' (definido no CSS .mainContent) */}
    <main className={styles.mainContent}>
      <Dashboard userName={userName} />
    </main>
    
  </div>
);
}

export default PagDash;