// src/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Se não há usuário, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se há usuário, renderiza o componente filho (no caso, PagDash)
  return <Outlet />;
};

export default ProtectedRoute;