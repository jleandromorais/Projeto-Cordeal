// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App' // Correção: Removido .tsx
import './index.css'; 
import { AuthProvider } from './AuthContext'; // Correção: Removido .tsx

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* 2. Envolva o App com o Provider */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)