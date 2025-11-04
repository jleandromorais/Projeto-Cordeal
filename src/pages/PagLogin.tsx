import React, { useState } from 'react';
// 1. Importar o Link e o useNavigate do react-router-dom
import { Link, useNavigate } from 'react-router-dom';
// 2. Importar o novo arquivo de estilos (com caminho absoluto)
import styles from '/src/Styles/PagLogin.module.css';

// Interface para as props que o App.tsx vai passar
interface PagLoginProps {
  onLogin: (role: string) => void;
}

const PagLogin: React.FC<PagLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepConnected, setKeepConnected] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password, keepConnected });
    // 3. Chamar a função onLogin (que veio do App.tsx) para navegar
    //    para o /dashboard
    onLogin(email); 
  };

  return (
    <div className={styles.pageContainer}>
      {/* Coluna Esquerda - Painel da Marca */}
      <div className={styles.brandPanel}>
        <h1 className={styles.logo}>CORDEAL</h1>

        {/* Padrão de Fundo Geométrico */}
        <div className={styles.patternContainer}>
          <div className={`${styles.shape} ${styles.circle1}`}></div>
          <div className={`${styles.shape} ${styles.circle2}`}></div>
          <div className={`${styles.shape} ${styles.circle3}`}></div>
          <div className={`${styles.shape} ${styles.square1}`}></div>
          <div className={`${styles.shape} ${styles.square2}`}></div>
          <div className={`${styles.shape} ${styles.square3}`}></div>
          <div className={`${styles.shape} ${styles.triangle1}`}></div>
          <div className={`${styles.shape} ${styles.triangle2}`}></div>
          <div className={`${styles.shape} ${styles.triangle3}`}></div>
        </div>
      </div>

      {/* Coluna Direita - Área do Formulário */}
      <div className={styles.formPanel}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Login</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Campo de E-mail */}
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

            {/* Campo de Senha */}
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

            {/* Seção Manter Conectado */}
            <div className={styles.optionsContainer}>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="keep-connected"
                  checked={keepConnected}
                  onChange={(e) => setKeepConnected(e.target.checked)}
                  className={styles.checkbox}
                />
                <label htmlFor="keep-connected" className={styles.checkboxLabel}>
                  Manter-me conectado
                </label>
              </div>
              {/* O ícone de toggle (interruptor) - Requer Font Awesome */}
              <i className={`fa-solid fa-toggle-on ${styles.toggleIcon}`}></i>
            </div>

            {/* Botão de Entrar */}
            <button
              type="submit"
              className={styles.submitButton}
            >
              Entrar
            </button>

            {/* Links do Rodapé */}
            <div className={styles.footerLinks}>
              {/* 4. Usar <Link> do react-router-dom */}
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