import React, { useState, useEffect } from 'react';
// 1. Importar o hook useNavigate
import { useNavigate } from 'react-router-dom';

// 2. CORREÇÃO: Importes relativos e sem extensão .tsx
import HeroSection from '../Components/HeroSection';
import FunctionalitiesSection from '../Components/FunctionalitiesSection';
import AboutSection from '../Components/AboutSection';
import QuemSomos from '../Components/QuemSomos'; 
import WelcomeModal from '../Components/WelcomeModal';
import ProfileSelectionModal from '../Components/ProfileSelectionModal';

// 3. A prop onLogin não é mais necessária aqui
interface PagInitProps {
  // onLogin: (role: string) => void; // Removido
}

// 4. O componente principal da página
const PagInit: React.FC<PagInitProps> = () => {
  
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  // 5. Inicializar o hook de navegação
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcomeModal');
    if (!hasSeenWelcome) {
      setIsWelcomeModalOpen(true);
    }
  }, []); 

  const handleWelcomeEnter = (): void => {
    localStorage.setItem('hasSeenWelcomeModal', 'true'); 
    setIsWelcomeModalOpen(false); 
    setIsProfileModalOpen(true);  
  };

  // 6. Função de seleção de perfil ATUALIZADA
  const handleProfileSelect = (role: string): void => {
    console.log(`Perfil selecionado: ${role}`);
    // Em vez de fazer login, navega para a tela de login
    navigate('/login'); 
  };

  return (
    <>
      {/* O Header foi removido daqui (está no MainLayout) */}

      {/* 7. Botão "Entrar" da HeroSection ATUALIZADO */}
      {/* CORREÇÃO: Agora ele abre o modal de seleção de perfil */}
      <HeroSection onEnterClick={() => setIsProfileModalOpen(true)} />

      <FunctionalitiesSection />
      <AboutSection />
      <QuemSomos />

      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => {
          localStorage.setItem('hasSeenWelcomeModal', 'true');
          setIsWelcomeModalOpen(false);
        }}
        onEnter={handleWelcomeEnter}
      />

      <ProfileSelectionModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onProfileSelect={handleProfileSelect} // Esta função agora navega para /login
      />
    </>      
  );
} 

export default PagInit;


