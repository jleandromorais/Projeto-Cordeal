import { useState } from 'react'
import { Init } from './pages/Init'

import HeroSection from './Components/HeroSection'
import FunctionalitiesSection from './Components/FunctionalitiesSection';
import AboutSection from './Components/AboutSection';
import Quem from './Components/QuemSomos'; 
import WelcomeModal  from './Components/WelcomeModal'
function App() {
  

  return (
    <>
    <Init/>

    <HeroSection />
    <FunctionalitiesSection />
    <AboutSection />
    <Quem />
    <WelcomeModal />
    </>     
  );

  
}

export default App
