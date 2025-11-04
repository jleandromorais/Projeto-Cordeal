// src/pages/PagLogin.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '/src/Styles/PagLogin.module.css';

// Importações do Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Importe sua config

// Remova a interface PagLoginProps, pois o App.tsx não controlará mais o login
// A navegação será feita aqui mesmo.

const PagLogin: React.FC = () => { // Removido: ({ onLogin })
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepConnected, setKeepConnected] = useState(false);
  const [error, setError] = useState<string | null>(null); // Estado para erros
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // 1. Fazer login com Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      
      // 2. Navegar para o dashboard
      // A prop onLogin não é mais necessária, pois o App.tsx
      // saberá do login através do "Auth Context" (ver Passo 7)
      navigate('/dashboard');

    } catch (firebaseError: any) {
      console.error("Erro ao logar:", firebaseError);
      setError("E-mail ou senha inválidos. Tente novamente.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* ... (Coluna Esquerda - Painel da Marca) ... */}
       <div className={styles.brandPanel}>
        {/* ... (seu JSX do painel da marca) ... */}
       </div>

      {/* Coluna Direita - Área do Formulário */}
      <div className={styles.formPanel}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Login</h2>

          {/* Exibir mensagem de erro */}
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* ... (seus campos de E-mail e Senha) ... */}
             <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            {/* ... (Sua seção Manter Conectado) ... */}
             <div className={styles.optionsContainer}>
              {/* ... (seu JSX de opções) ... */}
            </div>

            {/* Botão de Entrar */}
            <button
              type="submit"
              className={styles.submitButton}
            >
              Entrar
            </button>

            {/* ... (Seus Links do Rodapé) ... */}
            <div className={styles.footerLinks}>
              <Link to="/#" className={styles.link}>
                Esqueceu a senha?
              </Link>
              <Link to="/cadastro" className={styles.link}>
                Cadastrar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PagLogin;