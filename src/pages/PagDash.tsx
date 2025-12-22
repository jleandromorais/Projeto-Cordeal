// src/pages/PagDash.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext'; 

import Sidebar from '../Components/Sidebar';
import Header from '../Components/HeaderInit';
import { Dashboard } from '../Components/Dashboard';
import styles from '../Styles/PagDash.module.css';

// 1. IMPORTA O BOTÃO FLUTUANTE
import FloatingChatButton from '../Components/FloatingChatButton'; 

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

          const userRes = await fetch(`${API_URL}/user/profile`, { headers: authHeader });
          
          if (!userRes.ok) throw new Error('Falha ao buscar dados');
          
          const userData = await userRes.json();
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
    
    <div style={{ gridArea: 'header' }}>
      <Header userName={userName} /> 
    </div>
    
    <div style={{ gridArea: 'sidebar' }}>
       <Sidebar onLogout={onLogout} />
    </div>

    <main className={styles.mainContent}>
      <Dashboard userName={userName} />
    </main>
    
    {/* 2. O BOTÃO DO CHAT FICA AQUI */}
    <FloatingChatButton />

  </div>
);
}

export default PagDash;