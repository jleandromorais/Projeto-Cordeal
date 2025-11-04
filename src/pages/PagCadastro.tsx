import React, { useState } from 'react';
// CORREÇÃO: Usando o caminho absoluto, como em PagLogin.tsx
import styles from '/src/Styles/Cadastro.module.css';
import { useNavigate } from 'react-router-dom';

// Importações do Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
// CORREÇÃO: Usando o caminho absoluto
import { auth, db } from '/src/firebaseConfig'; // Importe sua config

// --- CORREÇÃO: Funções completas ---
const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, '') // Remove tudo que não é dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após o terceiro dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após o sexto dígito
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Coloca hífen antes dos dois últimos dígitos
    .substring(0, 14); // Limita o tamanho
};

const formatTelefone = (value: string) => {
  return value
    .replace(/\D/g, '') // Remove tudo que não é dígito
    .replace(/^(\d{2})(\d)/, '($1) $2') // Coloca parênteses nos dois primeiros dígitos
    .replace(/(\d{5})(\d)/, '$1-$2') // Coloca hífen após o quinto dígito (para celular)
    .substring(0, 15); // Limita o tamanho
};
// --- FIM DA CORREÇÃO ---

const PagCadastro: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    instituicao: "",
    curso: "",
    telefone: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [error, setError] = useState<string | null>(null); // Estado para erros
  const navigate = useNavigate(); // Hook para navegação

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Aplica a formatação condicional
    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'telefone') {
      formattedValue = formatTelefone(value);
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpa erros anteriores

    // 1. Validar o tamanho da senha (antes de enviar ao Firebase)
    if (formData.senha.length < 6) {
      setError("A senha é muito fraca. Use pelo menos 6 caracteres.");
      return; // Para a execução aqui
    }

    // 2. Validar senhas
    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      // 3. Criar o usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.senha
      );
      const user = userCredential.user;

      // 4. Salvar dados adicionais no Firestore (o "Backend")
      //    Removemos 'senha' e 'confirmarSenha' antes de salvar no DB
      const { senha, confirmarSenha, ...dadosParaSalvar } = formData;
      
      await setDoc(doc(db, "users", user.uid), {
        ...dadosParaSalvar,
        uid: user.uid // Salva o UID também no documento
      });

      // 5. Redirecionar para o dashboard
      navigate('/dashboard');

    } catch (firebaseError: any) {
      console.error("Erro ao cadastrar:", firebaseError);
      
      if (firebaseError.code === 'auth/email-already-in-use') {
        setError("Este e-mail já está em uso.");
      } else if (firebaseError.code === 'auth/weak-password') {
          // Erro do Firebase (backup, caso nossa validação falhe)
        setError("A senha é muito fraca. Use pelo menos 6 caracteres.");
      } else if (firebaseError.code === 'permission-denied') {
          setError("Erro de permissão do banco de dados. Verifique suas regras do Firestore.");
      }
      else {
        setError("Ocorreu um erro ao tentar cadastrar. Tente novamente.");
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>Dados Cadastrais</h1>

        {/* Exibir mensagem de erro */}
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
            {/* Grid que divide o formulário em colunas */}
            <div className={styles.formGrid}>

              {/* Coluna 1 */}
              <div className={styles.formColumn}>
                <div className={styles.formGroup}>
                  <label htmlFor="nome" className={styles.label}>
                    NOME <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    value={formData.nome}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="cpf" className={styles.label}>
                    CPF <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="cpf"
                    name="cpf"
                    type="text"
                    required
                    value={formData.cpf}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="000.000.000-00"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="instituicao" className={styles.label}>
                    INSTITUIÇÃO <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="instituicao"
                    name="instituicao"
                    type="text"
                    required
                    value={formData.instituicao}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="curso" className={styles.label}>
                    CURSO <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="curso"
                    name="curso"
                    type="text"
                    required
                    value={formData.curso}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Coluna 2 */}
              <div className={styles.formColumn}>
                <div className={styles.formGroup}>
                  <label htmlFor="telefone" className={styles.label}>
                    TELEFONE <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    required
                    value={formData.telefone}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    EMAIL <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="senha" className={styles.label}>
                    SENHA <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="senha"
                    name="senha"
                    type="password"
                    required
                    value={formData.senha}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmarSenha" className={styles.label}>
                    CONFIRMAR SENHA <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="confirmarSenha"
                    name="confirmarSenha"
                    type="password"
                    required
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
              </div>
            </div>

          {/* Container do botão */}
          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.submitButton}
            >
              Cadastrar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default PagCadastro;