// src/pages/PagDash.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext'; 

// Importe os seus componentes
import Sidebar from '../Components/Sidebar';
import Header from '../Components/HeaderInit'; // Importa o HeaderInit
import { Dashboard } from '../Components/Dashboard'; // Importa o Dashboard

// Importe o CSS
import styles from '../Styles/PagDash.module.css';

// --- TIPOS ---
interface PagDashProps {
  onLogout: () => void;
}

const PagDash: React.FC<PagDashProps> = ({ onLogout }) => {
  
  // 1. O estado do nome e o 'currentUser' ficam aqui (no "pai")
  const { currentUser } = useAuth();
  const [userName, setUserName] = useState<string>("..."); // O estado vive aqui

  // 2. O useEffect que busca o nome do utilizador fica aqui
  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const token = await currentUser.getIdToken();
          const authHeader = { 'Authorization': `Bearer ${token}` };
          const API_URL = 'http://localhost:3001/api';

          // Busca os dados do utilizador
          const userRes = await fetch(`${API_URL}/user/me`, { headers: authHeader });
          if (!userRes.ok) throw new Error('Falha ao buscar dados do utilizador');
          
          const userData = await userRes.json();
          setUserName(userData.nome || 'Utilizador'); // Salva o nome no estado

        } catch (error) {
          console.error("Erro ao carregar dados do utilizador:", error);
          setUserName("Utilizador"); // Define um fallback em caso de erro
        }
      };

      fetchUserData();
    }
  }, [currentUser]); // Roda sempre que o 'currentUser' mudar


  return (
    <div className={styles.pageLayout}>
      
      {/* 3. Passe o 'userName' como prop para o Header */}
      <Header userName={userName} /> 
      
      <Sidebar onLogout={onLogout} />

      <main className={styles.mainContent}>
        {/* 4. Passe o 'userName' como prop para o Dashboard */}
        <Dashboard userName={userName} />
      </main>
      
    </div>
  );
}

export default PagDash;