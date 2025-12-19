import React, { useState } from 'react';
// CORREÇÃO: Usando caminho relativo para subir um nível e acessar a pasta Styles
import styles from '../Styles/Cadastro.module.css';
import { useNavigate } from 'react-router-dom';

// Importações do Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
// CORREÇÃO: Usando caminho relativo para acessar o firebaseConfig na pasta src
import { auth, db } from '../firebaseConfig'; 

// --- Funções Auxiliares de Formatação ---
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

    // 1. Validar o tamanho da senha
    if (formData.senha.length < 6) {
      setError("A senha é muito fraca. Use pelo menos 6 caracteres.");
      return;
    }

    // 2. Validar se as senhas coincidem
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

      // 4. Salvar dados adicionais no Firestore
      // Removemos 'senha' e 'confirmarSenha' antes de salvar no banco
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha, confirmarSenha, ...dadosParaSalvar } = formData;
      
      // Usamos setDoc para definir o ID do documento igual ao UID do usuário
      await setDoc(doc(db, "users", user.uid), {
        ...dadosParaSalvar,
        uid: user.uid, // Salva o UID explicitamente no documento também
        createdAt: new Date().toISOString() // Adiciona data de criação
      });

      console.log("Usuário criado com sucesso:", user.uid);
      
      // 5. Redirecionar para a página inicial (Init) após o cadastro
      // Você pode mudar para '/dashboard' se preferir ir direto para lá
      navigate('/login');

    } catch (firebaseError: any) {
      console.error("Erro ao cadastrar:", firebaseError);
      
      if (firebaseError.code === 'auth/email-already-in-use') {
        setError("Este e-mail já está em uso.");
      } else if (firebaseError.code === 'auth/weak-password') {
        setError("A senha é muito fraca. Use pelo menos 6 caracteres.");
      } else if (firebaseError.code === 'permission-denied') {
          setError("Erro de permissão do banco de dados. Verifique suas regras do Firestore.");
      } else {
        setError("Ocorreu um erro ao tentar cadastrar. Tente novamente.");
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>Dados Cadastrais</h1>

        {/* Exibir mensagem de erro se houver */}
        {error && <p className={styles.errorMessage} style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

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
                    placeholder="Sua instituição de ensino"
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
                    placeholder="Seu curso"
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
        
        {/* Link para voltar ao Login caso já tenha conta */}
        <p style={{textAlign: 'center', marginTop: '1rem'}}>
           Já tem uma conta? <span style={{color: 'blue', cursor: 'pointer', textDecoration: 'underline'}} onClick={() => navigate('/')}>Faça Login</span>
        </p>
      </div>
    </div>
  );
}

export default PagCadastro;