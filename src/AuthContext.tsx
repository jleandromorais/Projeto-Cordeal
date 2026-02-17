// src/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebaseConfig';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ currentUser: null, loading: true });

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Flag para evitar race condition quando o componente desmontar
    let isMounted = true;

    // Este é o "ouvinte" do Firebase. Ele dispara
    // quando o usuário loga ou desloga.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (isMounted) {
        setCurrentUser(user);
        setLoading(false);
      }
    });

    // Cleanup: marca como desmontado e limpa o ouvinte
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    loading
  };

  // CORREÇÃO AQUI:
  // Se estiver a carregar, mostra uma mensagem simples ao centro em vez de nada.
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        A carregar...
      </div>
    );
  }

  // Quando o loading termina, mostra a aplicação (children)
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};