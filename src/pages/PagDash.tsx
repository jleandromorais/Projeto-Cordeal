// src/pages/PagDash.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext'; 

import Sidebar from '../Components/Sidebar';
import Header from '../Components/HeaderInit';
import { Dashboard } from '../Components/Dashboard';
import styles from '../Styles/PagDash.module.css';

// 1. IMPORTA O WIDGET DE CHAT E O BOTÃO
import FloatingChatButton from '../Components/FloatingChatButton'; 
import ChatWidget from '../Components/ChatWidget'; // <--- IMPORTANTE

interface PagDashProps {
  onLogout: () => void;
}

const PagDash: React.FC<PagDashProps> = ({ onLogout }) => {
  const { currentUser } = useAuth();
  const [userName, setUserName] = useState<string>("...");

  // 2. ESTADO PARA CONTROLAR O CHAT
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // 3. FUNÇÃO PARA ABRIR/FECHAR
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const token = await currentUser.getIdToken();
          const authHeader = { 'Authorization': `Bearer ${token}` };
          // Usa a variável de ambiente para produção, ou localhost para dev
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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
    
    {/* 4. RENDERIZAÇÃO DO CHAT E BOTÃO COM ONCLICK */}
    {isChatOpen && (
      <div style={{ position: 'fixed', bottom: '90px', right: '20px', zIndex: 1000 }}>
         <ChatWidget onClose={() => setIsChatOpen(false)} />
      </div>
    )}
    
    <FloatingChatButton onClick={toggleChat} />

  </div>
);
}

export default PagDash;