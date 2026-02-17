import React, { useState } from "react";
// Importações do Firebase e React Router
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Confirme se este caminho está correto

// Esta importação SÓ funciona no seu projeto local,
// e precisa ter as classes CSS que o seu JSX usa.
import styles from "../Styles/PagLogin.module.css";

// --- Componentes Auxiliares ---
// (ToggleLeft, Button, Checkbox)

interface ToggleLeftProps {
  className?: string;
}

const ToggleLeft: React.FC<ToggleLeftProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className || ""}
  >
    <rect width="20" height="12" x="2" y="6" rx="6" ry="6" />
    <circle cx="8" cy="12" r="2" />
  </svg>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type,
  className,
  children,
  ...props
}) => {
  return (
    <button type={type} className={className} {...props}>
      {children}
    </button>
  );
};

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onCheckedChange,
  className,
  ...props
}) => {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className={className}
      data-state={checked ? "checked" : "unchecked"}
      {...props}
    />
  );
};

// (O componente Link personalizado foi removido para usarmos o do react-router-dom)

// --- Componente Principal da Página de Login ---

export default function PagLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepConnected, setKeepConnected] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar senha

  // --- Lógica do Firebase ---
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpa erros anteriores

    try {
      // Configura a persistência baseado no checkbox
      // Se keepConnected for true, usa LOCAL (persiste entre fechamentos do navegador)
      // Se for false, usa SESSION (apenas enquanto o navegador está aberto)
      const { setPersistence, browserLocalPersistence, browserSessionPersistence } = await import('firebase/auth');
      
      await setPersistence(
        auth, 
        keepConnected ? browserLocalPersistence : browserSessionPersistence
      );

      // Tenta fazer o login com o Firebase
      await signInWithEmailAndPassword(auth, email, password);
      
      // Se der certo, navega para o dashboard
      navigate('/dashboard');

    } catch (firebaseError: any) {
      // Se der erro, mostra uma mensagem
      console.error("Erro ao logar:", firebaseError);
      setError("E-mail ou senha inválidos. Tente novamente.");
    }
  };
  // --- Fim da Lógica do Firebase ---

  return (
    // Container principal que usa a classe 'container' do CSS module
    <div className={styles.container}>
      {/* Coluna Esquerda - Painel da Marca */}
      <div className={styles.brandPanel}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <h1 className={styles.logo}>CORDEAL</h1>
        </div>

        {/* Padrão Geométrico de Fundo */}
        <div className={styles.geoPattern}>
          {/* Círculos */}
          <div
            className={styles.geoShape}
            style={{
              width: "128px",
              height: "128px",
              borderRadius: "50%",
              opacity: 0.2,
              transform: "rotate(12deg)",
              top: "15%",
              left: "10%",
            }}
          />
          <div
            className={styles.geoShape}
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "50%",
              opacity: 0.3,
              transform: "rotate(-45deg)",
              top: "60%",
              right: "15%",
            }}
          />
          <div
            className={styles.geoShape}
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              opacity: 0.2,
              transform: "rotate(90deg)",
              bottom: "20%",
              left: "25%",
            }}
          />

          {/* Quadrados */}
          <div
            className={styles.geoShape}
            style={{
              width: "112px",
              height: "112px",
              opacity: 0.2,
              transform: "rotate(45deg)",
              top: "40%",
              left: "15%",
            }}
          />
          <div
            className={styles.geoShape}
            style={{
              width: "80px",
              height: "80px",
              opacity: 0.3,
              transform: "rotate(-12deg)",
              top: "25%",
              right: "20%",
            }}
          />
          <div
            className={styles.geoShape}
            style={{
              width: "96px",
              height: "96px",
              opacity: 0.2,
              transform: "rotate(12deg)",
              bottom: "15%",
              right: "25%",
            }}
          />

          {/* Triângulos */}
          <div
            className={styles.geoTriangle}
            style={{
              opacity: 0.2,
              transform: "rotate(45deg)",
              borderLeft: "40px solid transparent",
              borderRight: "40px solid transparent",
              borderBottomWidth: "70px",
              top: "50%",
              right: "10%",
            }}
          />
          <div
            className={styles.geoTriangle}
            style={{
              opacity: 0.3,
              transform: "rotate(-12deg)",
              borderLeft: "30px solid transparent",
              borderRight: "30px solid transparent",
              borderBottomWidth: "50px",
              top: "70%",
              left: "40%",
            }}
          />
          <div
            className={styles.geoTriangle}
            style={{
              opacity: 0.2,
              transform: "rotate(90deg)",
              borderLeft: "25px solid transparent",
              borderRight: "25px solid transparent",
              borderBottomWidth: "45px",
              top: "10%",
              left: "50%",
            }}
          />
        </div>
      </div>

      {/* Coluna Direita - Área do Formulário */}
      <div className={styles.formArea}>
        <div className={styles.formContainer}>
          {/* Título */}
          <h2 className={styles.formTitle}>Login</h2>

          {/* Exibe a mensagem de erro do Firebase */}
          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Campo de E-mail */}
            <div className={styles.formField}>
              <label htmlFor="email" className={styles.formLabel}>
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.formInput}
                required
              />
            </div>

            {/* Campo de Senha */}
            <div className={styles.formField}>
              <label htmlFor="password" className={styles.formLabel}>
                Senha
              </label>
              <div className={styles.passwordInputWrapper}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.formInput}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.togglePasswordButton}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Seção Manter Conectado */}
            <div className={styles.optionsRow}>
              <div className={styles.keepConnected}>
                <Checkbox
                  id="keep-connected"
                  checked={keepConnected}
                  onCheckedChange={(checked) => setKeepConnected(checked)}
                  className={styles.checkbox}
                />
                <label
                  htmlFor="keep-connected"
                  className={styles.keepConnectedLabel}
                >
                  Manter-me conectado
                </label>
              </div>
              <ToggleLeft className={styles.toggleIcon} />
            </div>

            {/* Botão de Envio */}
            <Button type="submit" className={styles.submitButton}>
              Entrar
            </Button>

            {/* Links do Rodapé (usando RouterLink) */}
            <div className={styles.footerLinks}>
              <RouterLink to="/cadastro" className={styles.footerLink}>
                Não tem uma conta? Cadastre-se
              </RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}