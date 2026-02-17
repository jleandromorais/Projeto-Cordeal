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
  // Usa o displayName do Firebase como fallback imediato
  const [userName, setUserName] = useState<string>(currentUser?.displayName || "...");

  // 2. ESTADO PARA CONTROLAR O CHAT
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // 3. FUNÇÃO PARA ABRIR/FECHAR
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  useEffect(() => {
    if (currentUser) {
      // Mostra o displayName do Firebase imediatamente se existir
      if (currentUser.displayName) {
        setUserName(currentUser.displayName);
      }

      const fetchUserData = async () => {
        try {
          // Cache: verifica se já tem o nome em localStorage
          const cachedName = localStorage.getItem(`userName_${currentUser.uid}`);
          if (cachedName) {
            setUserName(cachedName);
          }

          const token = await currentUser.getIdToken();
          const authHeader = { 'Authorization': `Bearer ${token}` };
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

          const userRes = await fetch(`${API_URL}/user/profile`, { headers: authHeader });
          
          if (!userRes.ok) throw new Error('Falha ao buscar dados');
          
          const userData = await userRes.json();
          const finalName = userData.name || 'Utilizador';
          setUserName(finalName);
          
          // Salva no cache para próximas cargas
          localStorage.setItem(`userName_${currentUser.uid}`, finalName);

        } catch (error) {
          console.error("Erro ao buscar perfil:", error);
          // Mantém o displayName ou o nome do cache se houver erro
          if (!currentUser.displayName) {
            setUserName("Utilizador");
          }
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

 return (
  <div className={styles.pageLayout}>
    
    {/* Sidebar fixa */}
    <Sidebar onLogout={onLogout} />

    {/* Conteúdo principal */}
    <main className={styles.mainContent}>
      <Header userName={userName} /> 
      <Dashboard userName={userName} />
    </main>
    
    {/* 4. RENDERIZAÇÃO DO CHAT E BOTÃO */}
    {isChatOpen && (
      <div style={{ position: 'fixed', bottom: '90px', right: '30px', zIndex: 1000 }}>
         <ChatWidget onClose={() => setIsChatOpen(false)} />
      </div>
    )}
    
    <FloatingChatButton onClick={toggleChat} />

  </div>
);
}

export default PagDash;