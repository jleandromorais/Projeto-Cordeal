<div align="center">

# 🎓 CORDEAL - Plataforma de Aprendizagem Gamificada

### *Transformando o estudo da matemática em uma jornada interativa e envolvente*

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.7.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-6.3.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[🌐 Demo Live](https://seu-deploy.vercel.app) • [📖 Documentação](https://github.com/jleandromorais/Projeto-Cordeal) • [🐛 Reportar Bug](https://github.com/jleandromorais/Projeto-Cordeal/issues) • [💡 Sugerir Feature](https://github.com/jleandromorais/Projeto-Cordeal/issues)

</div>

---

## 📸 Screenshots

### Tela Inicial
<!-- ![Tela Inicial](./docs/images/home-page.png) -->
*Insira aqui uma captura da tela inicial do projeto mostrando o header com gradiente e hero section*

### Dashboard do Aluno
<!-- ![Dashboard](./docs/images/dashboard.png) -->
*Insira aqui o dashboard mostrando as métricas de questões respondidas, horas dedicadas e calendário*

### Sistema de Gamificação
<!-- ![Gamificação](./docs/images/gamification.png) -->
*Insira aqui a interface de gamificação com os módulos e progresso do estudante*

### Chat Neves (IA)
<!-- ![Neves Chat](./docs/images/neves-chat.png) -->
*Insira aqui o widget do chat Neves respondendo perguntas sobre matemática*

### Sistema de Feedback
<!-- ![Feedback](./docs/images/feedback-page.png) -->
*Insira aqui a página de feedback com avaliação por estrelas e histórico*

### Página "Quem Somos"
<!-- ![Equipe](./docs/images/team-section.png) -->
*Insira aqui a seção da equipe com os cards dos desenvolvedores*

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura do Sistema](#-arquitetura-do-sistema)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Estilização](#-estilização)
- [Deploy](#-deploy)
- [Equipe](#-equipe)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

**CORDEAL** é uma plataforma educacional inovadora desenvolvida para auxiliar estudantes no processo de aprendizagem de matemática através de gamificação, inteligência artificial e acompanhamento personalizado de desempenho.

### 🌟 Origem do Nome

O nome **Cordeal** é uma junção significativa de três conceitos:

- **Cardinal**: Fazendo alusão aos números e à matemática
- **Cordial**: Trazendo gentileza, respeito e educação ao processo de aprendizagem
- **Cordel**: Representando regionalidade e homenageando o idealizador do projeto, Professor João Neves, entusiasta em literatura de cordel

### 🎓 Objetivo

Tornar o estudo da matemática **leve, proveitoso e envolvente**, permitindo que estudantes extraiam o melhor de si enquanto acompanham seu rendimento de forma lúdica e motivadora.

---

## ✨ Funcionalidades

### 🔐 Autenticação e Perfil
- ✅ **Login/Cadastro** com Firebase Authentication
- ✅ **Persistência de sessão** (opção "manter conectado")
- ✅ **Mostrar/ocultar senha** com ícone interativo
- ✅ **Perfil do usuário** com informações personalizadas
- ✅ **Cache de dados** para carregamento instantâneo

### 📊 Dashboard Inteligente
- ✅ **Métricas em tempo real**:
  - Total de questões respondidas
  - Horas dedicadas ao estudo
  - Desempenho por módulo
- ✅ **Calendário de estudos** integrado
- ✅ **Sistema de anotações** pessoais
- ✅ **Gráficos de progresso** visual

### 🎮 Gamificação
- ✅ **Sistema de módulos progressivos**
- ✅ **Pontuação por atividade concluída**
- ✅ **Níveis de dificuldade** (básico → avançado)
- ✅ **Conquistas e marcos** de aprendizagem
- ✅ **Feedback imediato** em quizzes

### 🤖 Neves - Assistente IA
- ✅ **Chat inteligente** especializado em matemática
- ✅ **Respostas contextualizadas** usando Google Gemini
- ✅ **Restrição de escopo**: foco exclusivo em matemática e matemática computacional
- ✅ **Interface amigável** com histórico de conversas
- ✅ **Mensagem de boas-vindas** personalizada

### 💬 Sistema de Feedback
- ✅ **Avaliação por estrelas** (1-5)
- ✅ **Categorias de feedback** (sugestão, bug, elogio)
- ✅ **Histórico de feedbacks** enviados
- ✅ **Integração com Firestore** para persistência

### 📈 Estatísticas Detalhadas
- ✅ **Acompanhamento de desempenho**
- ✅ **Análise de tempo de estudo**
- ✅ **Gráficos de evolução**
- ✅ **Relatórios personalizados**

### 📱 Design Responsivo
- ✅ **Mobile-first approach**
- ✅ **Layout adaptativo** para tablets e desktops
- ✅ **Sidebar colapsável**
- ✅ **Header fixo** com gradiente personalizado
- ✅ **Cores institucionais** (#419EBF, #033B5B)

---

## 🛠️ Tecnologias Utilizadas

### Core
- **React 19.0.0** - Biblioteca para interfaces de usuário
- **TypeScript 5.7.2** - Superset JavaScript tipado
- **Vite 6.3.1** - Build tool de nova geração

### Roteamento
- **React Router DOM 7.11.0** - Navegação SPA

### Backend/Database
- **Firebase 12.7.0**:
  - Authentication (Autenticação de usuários)
  - Firestore (Banco de dados NoSQL)
  - Persistência local e em sessão

### UI/UX
- **CSS Modules** - Estilos escopados por componente
- **Phosphor Icons 2.1.10** - Biblioteca de ícones moderna
- **Design System** customizado com gradientes e animações

### Inteligência Artificial
- **Google Gemini API** - Integração via backend

### Qualidade de Código
- **ESLint 9.22.0** - Linting e padrões
- **TypeScript ESLint 8.26.1** - Regras específicas para TS

---

## 🏗️ Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                      CORDEAL FRONTEND                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Landing    │  │    Login     │  │   Cadastro   │      │
│  │     Page     │  │     Page     │  │     Page     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │            Rotas Protegidas (Auth)                    │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │                                                         │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │  │
│  │  │Dashboard│ │Questions│ │  Stats  │ │Feedback │    │  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘    │  │
│  │                                                         │  │
│  │  ┌───────────────────────────────────────────────┐    │  │
│  │  │     Sidebar + Header (Layout Global)          │    │  │
│  │  └───────────────────────────────────────────────┘    │  │
│  │                                                         │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Chat Widget (Neves IA)                   │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                           ▼
                 Firebase Client SDK
                           ▼
          ┌────────────────────────────────┐
          │    Firebase Services           │
          ├────────────────────────────────┤
          │  • Authentication              │
          │  • Firestore Database          │
          │  • Real-time Updates           │
          └────────────────────────────────┘
                           ▼
                      Backend API
                  (Node.js + Express)
                           ▼
              ┌───────────────────────┐
              │   Google Gemini API   │
              │   (IA Neves Chat)     │
              └───────────────────────┘
```

### 🔄 Fluxo de Dados

1. **Autenticação**: Firebase Auth → Token JWT → Protected Routes
2. **Dashboard**: Firestore → Cache Local → UI
3. **Chat IA**: Frontend → Backend API → Gemini → Response
4. **Feedback**: Form → Backend → Firestore → Update UI

---

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 ou **yarn** >= 1.22.0
- **Git** ([Download](https://git-scm.com/))
- Conta no **Firebase** ([Console](https://console.firebase.google.com/))
- Conta no **Google Cloud** (para Gemini API)

---

## 🚀 Instalação

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/jleandromorais/Projeto-Cordeal.git
cd Projeto-Cordeal
```

### 2️⃣ Instale as dependências

```bash
npm install
```

ou

```bash
yarn install
```

### 3️⃣ Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

---

## ⚙️ Configuração

### 📝 Variáveis de Ambiente

Edite o arquivo `.env` com suas credenciais:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_projeto_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
VITE_FIREBASE_MEASUREMENT_ID=seu_measurement_id

# Backend API
VITE_API_URL=http://localhost:3001/api
# Para produção use: https://sua-api.onrender.com/api

# Google Gemini (IA)
VITE_GEMINI_API_KEY=sua_gemini_key
```

### 🔥 Como obter as credenciais do Firebase:

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto ou crie um novo
3. Vá em **Configurações do Projeto** (ícone de engrenagem)
4. Na seção **Seus apps**, clique em **Web** (`</>`)
5. Copie as credenciais do `firebaseConfig`
6. **Ative** os seguintes serviços:
   - Authentication → Email/Password
   - Firestore Database
   - Storage (opcional)

### 🤖 Como obter a API Key do Gemini:

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Faça login com sua conta Google
3. Clique em **Create API Key**
4. Copie a chave gerada

---

## 💻 Uso

### Modo Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em: `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`

### Preview do Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

---

## 📁 Estrutura de Pastas

```
Projeto-Cordeal/
│
├── public/                      # Arquivos públicos estáticos
│   └── vite.svg
│
├── src/
│   ├── assets/                  # Recursos estáticos
│   │   ├── img/                 # Imagens do projeto
│   │   │   ├── logo.png
│   │   │   ├── hero-bg.jpg
│   │   │   ├── foto-alessandra.jpg
│   │   │   └── foto-thays.jpg
│   │   └── icons/               # Ícones customizados
│   │
│   ├── Components/              # Componentes React
│   │   ├── AboutSection.tsx     # Seção "O que é"
│   │   ├── ChatWidget.tsx       # Widget do Neves (IA)
│   │   ├── Dashboard.tsx        # Dashboard principal
│   │   ├── FunctionalitiesSection.tsx
│   │   ├── Header.tsx           # Header público
│   │   ├── HeaderLogged.tsx     # Header autenticado
│   │   ├── HeroSection.tsx      # Hero da landing page
│   │   ├── QuemSomos.tsx        # Página "Quem Somos"
│   │   └── Sidebar.tsx          # Menu lateral
│   │
│   ├── pages/                   # Páginas da aplicação
│   │   ├── PagActivities.tsx    # Página de atividades
│   │   ├── PagCadastro.tsx      # Cadastro de usuário
│   │   ├── PagDash.tsx          # Dashboard
│   │   ├── PagFeedback.tsx      # Sistema de feedback
│   │   ├── PagHome.tsx          # Landing page
│   │   ├── PagLogin.tsx         # Login
│   │   ├── PagMinhasEstatisticas.tsx  # Estatísticas
│   │   └── PagQuestions.tsx     # Questões/Quizzes
│   │
│   ├── Styles/                  # CSS Modules
│   │   ├── AboutSection.module.css
│   │   ├── ChatWidget.module.css
│   │   ├── Dashboard.module.css
│   │   ├── FunctionalitiesSection.module.css
│   │   ├── Header.module.css
│   │   ├── HeaderLogged.module.css
│   │   ├── HeroSection.module.css
│   │   ├── MinhasEstatisticas.css
│   │   ├── PagActivities.module.css
│   │   ├── PagCadastro.module.css
│   │   ├── PagFeedback.module.css
│   │   ├── PagHome.module.css
│   │   ├── PagLogin.module.css
│   │   ├── PagQuestions.module.css
│   │   ├── QuemSomos.module.css
│   │   └── Sidebar.module.css
│   │
│   ├── config/
│   │   └── firebase.ts          # Configuração Firebase
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx      # Contexto de autenticação
│   │
│   ├── App.tsx                  # Componente raiz
│   ├── App.css                  # Estilos globais
│   ├── main.tsx                 # Entry point
│   └── vite-env.d.ts            # Tipagens Vite
│
├── .env                         # Variáveis de ambiente (não commitar!)
├── .env.example                 # Template de variáveis
├── .gitignore                   # Arquivos ignorados pelo Git
├── eslint.config.js             # Configuração ESLint
├── index.html                   # HTML raiz
├── package.json                 # Dependências e scripts
├── tsconfig.json                # Config TypeScript (app)
├── tsconfig.node.json           # Config TypeScript (Node)
├── vite.config.ts               # Configuração Vite
└── README.md                    # Este arquivo
```

---

## 🎨 Estilização

### Paleta de Cores

```css
/* Cores Principais */
--primary-blue: #419EBF;      /* Azul institucional */
--dark-blue: #033B5B;         /* Azul escuro */
--light-blue: #7BC4E8;        /* Azul claro */
--mid-blue: #1A6B8A;          /* Azul intermediário */

/* Cores de Suporte */
--white: #FFFFFF;
--gray-light: #F5F5F5;
--gray-mid: #E0E0E0;
--gray-dark: #5A7A8A;

/* Estados */
--success: #4CAF50;
--warning: #FF9800;
--error: #F44336;
--info: #2196F3;
```

### Gradientes

```css
/* Gradiente Principal */
background: linear-gradient(135deg, #7BC4E8 0%, #419EBF 50%, #033B5B 100%);

/* Gradiente Sidebar */
background: linear-gradient(180deg, #033B5B 0%, #1A6B8A 100%);

/* Gradiente Header Navigation */
color: #7BC4E8 → #419EBF → #1A6B8A → #033B5B
```

### Tipografia

- **Família**: System fonts (native)
- **Títulos**: 24px - 48px, font-weight: 700
- **Corpo**: 14px - 16px, font-weight: 400
- **Pequeno**: 12px - 14px, font-weight: 400

---

## 🌐 Deploy

### Deploy no Vercel (Recomendado)

1️⃣ **Instale o Vercel CLI:**
```bash
npm install -g vercel
```

2️⃣ **Faça login:**
```bash
vercel login
```

3️⃣ **Deploy:**
```bash
vercel --prod
```

4️⃣ **Configure as variáveis de ambiente:**
- Acesse o [Dashboard Vercel](https://vercel.com/dashboard)
- Vá em **Settings → Environment Variables**
- Adicione todas as variáveis do arquivo `.env`
- Use o botão **Import .env** para facilitar

5️⃣ **Redeploy:**
```bash
vercel --prod
```

### Outras Plataformas

#### Netlify
```bash
npm run build
# Faça upload da pasta dist/
```

#### GitHub Pages
```bash
npm run build
# Configure gh-pages branch com conteúdo de dist/
```

---

## 👥 Equipe

<table>
  <tr>
    <td align="center">
      <a href="https://www.linkedin.com/in/seu-linkedin">
        <img src="https://via.placeholder.com/150" width="100px;" alt="Leandro Morais"/><br>
        <sub>
          <b>Leandro Morais</b>
        </sub>
      </a>
      <br>
      <sub>Tech Lead & Dev Full Stack</sub>
    </td>
    <td align="center">
      <a href="https://www.linkedin.com/in/alessandra-barbosa-308072323">
        <img src="./src/assets/img/foto-alessandra.jpg" width="100px;" alt="Alessandra Barbosa"/><br>
        <sub>
          <b>Alessandra Barbosa</b>
        </sub>
      </a>
      <br>
      <sub>Designer Figma & Dev Front-End</sub>
    </td>
    <td align="center">
      <a href="https://br.linkedin.com/in/thays-barbosa-332683318">
        <img src="./src/assets/img/foto-thays.jpg" width="100px;" alt="Thays Barbosa"/><br>
        <sub>
          <b>Thays Barbosa</b>
        </sub>
      </a>
      <br>
      <sub>Dev Full Stack</sub>
    </td>
  </tr>
</table>

### 🎓 Orientação

**Professor João Neves** - Idealizador e orientador do projeto

---

## 🤝 Contribuindo

Contribuições são **muito bem-vindas**! 

### Como contribuir:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/MinhaFeature`)
3. **Commit** suas mudanças (`git commit -m 'feat: Adiciona MinhaFeature'`)
4. **Push** para a branch (`git push origin feature/MinhaFeature`)
5. Abra um **Pull Request**

### Padrão de Commits

Seguimos o [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração de código
- `test:` Testes
- `chore:` Manutenção

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Contato

**Repositório Frontend**: [https://github.com/jleandromorais/Projeto-Cordeal](https://github.com/jleandromorais/Projeto-Cordeal)

**Repositório Backend**: [https://github.com/jleandromorais/Back-Projeto-Cordeal](https://github.com/jleandromorais/Back-Projeto-Cordeal)

**Issues/Bugs**: [Reportar Problema](https://github.com/jleandromorais/Projeto-Cordeal/issues)

---

## 🙏 Agradecimentos

- **Professor João Neves** - pela idealização e orientação
- **Firebase** - pela infraestrutura robusta
- **Google Gemini** - pela IA conversacional
- **Comunidade Open Source** - pelas ferramentas incríveis

---

<div align="center">

### ⭐ Se este projeto te ajudou, deixe uma estrela!

**Desenvolvido com 💙 pela Equipe Cordeal**

*Transformando educação através da tecnologia*

</div>
