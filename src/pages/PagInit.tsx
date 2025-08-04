import React, { useState, useEffect } from 'react';

// 1. Importe os seus componentes reais a partir da pasta de componentes
import Header from '../Components/Header'; // Usando o Header da página inicial
import HeroSection from '../Components/HeroSection';
import FunctionalitiesSection from '../Components/FunctionalitiesSection';
import AboutSection from '../Components/AboutSection';
import QuemSomos from '../Components/QuemSomos'; 
import WelcomeModal from '../Components/WelcomeModal';
import ProfileSelectionModal from '../Components/ProfileSelectionModal';

// 2. Defina as props que esta página espera receber (opcional, mas bom para o futuro)
interface PagInitProps {
  onLogin: (role: string) => void;
}

// 3. O componente principal da página, agora corretamente estruturado e tipado
const PagInit: React.FC<PagInitProps> = ({ onLogin }) => {
  
  // 4. Toda a sua lógica de estado e funções está agora dentro do componente
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Efeito para abrir o modal de boas-vindas na primeira visita
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcomeModal');
    if (!hasSeenWelcome) {
      setIsWelcomeModalOpen(true);
    }
  }, []); // O array vazio [] faz isto rodar apenas uma vez quando o app inicia

  // Função para o fluxo do modal de boas-vindas
  const handleWelcomeEnter = (): void => {
    localStorage.setItem('hasSeenWelcomeModal', 'true'); // Marca como visto
    setIsWelcomeModalOpen(false); // Fecha o primeiro modal
    setIsProfileModalOpen(true);  // Abre o segundo modal
  };

  // Função para lidar com a seleção de perfil e chamar a função de login
  const handleProfileSelect = (role: string): void => {
    console.log(`Perfil selecionado: ${role}`);
    onLogin(role); // Chama a função que veio do App.tsx
  };

  return (
    <>
      <Header />

      {/* A HeroSection abre o modal de seleção de perfil ao clicar em "Entrar" */}
      <HeroSection onEnterClick={() => setIsProfileModalOpen(true)} />

      <FunctionalitiesSection />
      <AboutSection />
      <QuemSomos />

      {/* Os modais são controlados pelo estado desta página */}
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