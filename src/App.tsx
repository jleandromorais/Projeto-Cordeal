// Em src/App.tsx

import { useState, useEffect } from 'react'; // Adicione useEffect
import HeroSection from './Components/HeroSection';
import FunctionalitiesSection from './Components/FunctionalitiesSection';
import AboutSection from './Components/AboutSection';
import Quem from './Components/QuemSomos'; 
// Importe os dois modais
import WelcomeModal from './Components/WelcomeModal';
import ProfileSelectionModal from './Components/ProfileSelectionModal';
import PagInit  from './pages/PagInit';   
import PagDash from './pages/PagDash';

function App() {
  

  return (
    <>
    <PagDash />
    </>
  );
}

export default App;