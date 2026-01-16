import React, { useState } from 'react';
import styles from '../Styles/Cadastro.module.css';
import { useNavigate } from 'react-router-dom';

// Importações do Firebase
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Adicionei updateProfile para salvar o nome no Auth também
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

// --- Funções Auxiliares de Formatação ---
const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .substring(0, 14);
};

const formatTelefone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .substring(0, 15);
};
// --- FIM DAS FUNÇÕES AUXILIARES ---

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

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // ATUALIZAÇÃO: Agora aceita inputs e selects
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
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
    setError(null);

    if (formData.senha.length < 6) {
      setError("A senha é muito fraca. Use pelo menos 6 caracteres.");
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      // 1. Criar o usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.senha
      );
      const user = userCredential.user;

      // 2. Atualizar o perfil do Auth com o Nome (Importante para aparecer no Header depois)
      await updateProfile(user, {
        displayName: formData.nome
      });

      // 3. Salvar dados adicionais no Firestore
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha, confirmarSenha, ...dadosParaSalvar } = formData;
      
      await setDoc(doc(db, "users", user.uid), {
        ...dadosParaSalvar,
        uid: user.uid,
        createdAt: new Date().toISOString(),
        // Inicializa stats zerados para evitar erros na Dashboard
        stats: {
            questoesRespondidas: 0,
            questoesCertas: 0,
            horasDedicadas: 0,
            atividadesFeitas: 0,
            diasDedicados: 0
        }
      });

      console.log("Usuário criado com sucesso:", user.uid);
      
      // Redireciona para o login
      navigate('/login');

    } catch (firebaseError: any) {
      console.error("Erro ao cadastrar:", firebaseError);
      
      if (firebaseError.code === 'auth/email-already-in-use') {
        setError("Este e-mail já está em uso.");
      } else if (firebaseError.code === 'auth/weak-password') {
        setError("A senha é muito fraca. Use pelo menos 6 caracteres.");
      } else if (firebaseError.code === 'permission-denied') {
          setError("Erro de permissão do banco de dados.");
      } else {
        setError("Ocorreu um erro ao tentar cadastrar. Tente novamente.");
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>Dados Cadastrais</h1>

        {error && <p className={styles.errorMessage} style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
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
                    placeholder="Seu nome completo"
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
                    maxLength={14}
                  />
                </div>

                {/* NOVO SELECT DE INSTITUIÇÃO */}
                <div className={styles.formGroup}>
                  <label htmlFor="instituicao" className={styles.label}>
                    INSTITUIÇÃO <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="instituicao"
                    name="instituicao"
                    required
                    value={formData.instituicao}
                    onChange={handleChange}
                    className={styles.input} // Mantém o estilo do input
                  >
                    <option value="" disabled>Selecione sua instituição</option>
                    <option value="CESAR School">CESAR School</option>
                    <option value="UFPE">UFPE</option>
                    <option value="UPE">UPE</option>
                    <option value="UNICAP">UNICAP</option>
                    <option value="Outra">Outra</option>
                  </select>
                </div>

                {/* NOVO SELECT DE CURSO */}
                <div className={styles.formGroup}>
                  <label htmlFor="curso" className={styles.label}>
                    CURSO <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="curso"
                    name="curso"
                    required
                    value={formData.curso}
                    onChange={handleChange}
                    className={styles.input}
                  >
                    <option value="" disabled>Selecione seu curso</option>
                    <option value="ADS">Análise e Desenv. de Sistemas (ADS)</option>
                    <option value="Ciência da Computação">Ciência da Computação</option>
                    <option value="Design">Design</option>
                    <option value="Engenharia de Software">Engenharia de Software</option>
                    <option value="Outro">Outro</option>
                  </select>
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
                    maxLength={15}
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
                    placeholder="seu@email.com"
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
                    placeholder="Mínimo 6 caracteres"
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
                    placeholder="Repita sua senha"
                  />
                </div>
              </div>
            </div>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
              Cadastrar
            </button>
          </div>

        </form>
        
        <p style={{textAlign: 'center', marginTop: '1rem'}}>
           Já tem uma conta? <span style={{color: 'blue', cursor: 'pointer', textDecoration: 'underline'}} onClick={() => navigate('/')}>Faça Login</span>
        </p> 
      </div>
    </div>
  );
}

export default PagCadastro;