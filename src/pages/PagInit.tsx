import React, { useState, useEffect } from 'react';

// 1. O 'Header' foi REMOVIDO daqui
import HeroSection from '../Components/HeroSection.tsx';
import FunctionalitiesSection from '../Components/FunctionalitiesSection.tsx';
import AboutSection from '../Components/AboutSection.tsx';
import QuemSomos from '../Components/QuemSomos.tsx'; 
import WelcomeModal from '../Components/WelcomeModal.tsx';
import ProfileSelectionModal from '../Components/ProfileSelectionModal.tsx';

// 2. Defina as props que esta página espera receber
interface PagInitProps {
  onLogin: (role: string) => void;
}

// 3. O componente principal da página
const PagInit: React.FC<PagInitProps> = ({ onLogin }) => {
  
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

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

  const handleProfileSelect = (role: string): void => {
    console.log(`Perfil selecionado: ${role}`);
    onLogin(role); // Chama a função que veio do App.tsx
  };

  return (
    <>
      {/* O <Header /> NÃO está mais aqui (será renderizado pelo MainLayout) */}

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
        onProfileSelect={handleProfileSelect}
      />
    </>      
  );
} 

export default PagInit;
