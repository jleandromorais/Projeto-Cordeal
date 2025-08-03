import React, { useState, useEffect } from 'react';

// --- Componentes de Exemplo (Substitua pelos seus componentes reais) ---

// Exemplo para: <Init /> (Pode ser um header ou componente de inicialização)
const Init = () => (
  <header style={{ padding: '1rem', backgroundColor: '#333', color: 'white', textAlign: 'center' }}>
    <h1>Plataforma Cordial</h1>
  </header>
);

// Exemplo para: <HeroSection />
const HeroSection = ({ onEnterClick }) => (
  <section style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
    <h2>Aprenda de forma direcionada</h2>
    <p>Sua jornada para o conhecimento começa aqui.</p>
    <button onClick={onEnterClick} style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer', marginTop: '1rem' }}>
      Entrar
    </button>
  </section>
);

// Exemplo para: <FunctionalitiesSection />, <AboutSection />, <Quem />
const PlaceholderSection = ({ title }) => (
  <div style={{ padding: '2rem', borderBottom: '1px solid #ddd' }}>
    <h3>{title}</h3>
  </div>
);

// Exemplo para: <WelcomeModal />
const WelcomeModal = ({ isOpen, onClose, onEnter }) => {
  if (!isOpen) return null;
  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h2>Bem-vindo(a) à nossa plataforma!</h2>
        <p>Estamos felizes em ter você aqui.</p>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose}>Fechar</button>
          <button onClick={onEnter} style={{ backgroundColor: '#007BFF', color: 'white' }}>Entrar</button>
        </div>
      </div>
    </div>
  );
};

// Exemplo para: <ProfileSelectionModal />
const ProfileSelectionModal = ({ isOpen, onClose, onProfileSelect }) => {
  if (!isOpen) return null;

  const handleSelect = (role) => {
    onProfileSelect(role);
    onClose(); // Fecha o modal após a seleção
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h2>Como você gostaria de entrar?</h2>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button onClick={() => handleSelect('aluno')}>Sou Aluno</button>
          <button onClick={() => handleSelect('professor')}>Sou Professor</button>
        </div>
        <button onClick={onClose} style={{ marginTop: '20px' }}>Cancelar</button>
      </div>
    </div>
  );
};

// --- Estilos para os Modais de Exemplo ---
const modalOverlayStyle = {
  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex',
  alignItems: 'center', justifyContent: 'center', zIndex: 1000,
};
const modalContentStyle = {
  backgroundColor: 'white', padding: '2rem', borderRadius: '8px',
  width: '90%', maxWidth: '500px', textAlign: 'center',
};


// --- Componente Principal da Página de Inicialização ---
function PagInit() {
  // Estado para controlar cada um dos modais
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Efeito para abrir o modal de boas-vindas na primeira visita
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcomeModal');
    if (!hasSeenWelcome) {
      setIsWelcomeModalOpen(true);
    }
  }, []); // O array vazio [] faz isso rodar apenas uma vez quando o app inicia

  // Função que será chamada quando o usuário clicar em "Entrar" no modal de boas-vindas
  const handleWelcomeEnter = () => {
    localStorage.setItem('hasSeenWelcomeModal', 'true'); // Marca como visto
    setIsWelcomeModalOpen(false); // Fecha o primeiro modal
    setIsProfileModalOpen(true);  // Abre o segundo modal
  };

  // Função para lidar com a seleção de perfil no segundo modal
  const handleProfileSelect = (role) => { // Removida a tipagem de TypeScript
    console.log(`Perfil selecionado: ${role}`);
    localStorage.setItem('userRole', role);
    // O modal já é fechado dentro do seu próprio componente
  };

  return (
    <>
      <Init />

      {/* HeroSection agora recebe a prop 'onEnterClick' para abrir o modal de perfil */}
      <HeroSection onEnterClick={() => setIsProfileModalOpen(true)} />

      <PlaceholderSection title="Funcionalidades" />
      <PlaceholderSection title="Sobre Nós" />
      <PlaceholderSection title="Quem Somos" />

      {/* Passando as props para controlar os modais */}
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