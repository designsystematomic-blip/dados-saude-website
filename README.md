# 📊 Dados Saúde - Frontend

Interface web moderna e acessível para gestão de dados de saúde, construída com React/Remix e integrada com design system próprio.

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Tecnologias](#-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Execução](#-execução)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Rotas](#-rotas)
- [Design System](#-design-system)
- [Backend Integration](#-backend-integration)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Deploy](#-deploy)

## 🎯 Visão Geral

O **Dados Saúde Frontend** é uma aplicação web moderna desenvolvida em **React/Remix** que oferece uma interface intuitiva e acessível para gerenciamento de exames médicos. A aplicação se conecta com um backend Node.js/Express e utiliza uma biblioteca de componentes própria para garantir consistência visual e de experiência.

### ✨ Principais Características

- 🎨 **Design System Próprio**: Componentes reutilizáveis e consistentes
- ♿ **Acessibilidade**: Conforme padrões WCAG 2.1
- 📱 **Responsivo**: Funciona em desktop, tablet e mobile
- 🔒 **Seguro**: Autenticação JWT e proteção de rotas
- 🚀 **Performance**: SSR com Remix e otimizações modernas
- 🔄 **Estado Global**: Context API para gerenciamento de estado

## 🚀 Tecnologias do website

### Core
- **[Remix](https://remix.run/)** v2.x - Full-stack web framework
- **[React](https://reactjs.org/)** v18.x - Interface de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Vite](https://vitejs.dev/)** - Build tool e bundler

### Styling & UI
- **CSS Modules** - Estilização encapsulada
- **design-system-atomic** - Design system próprio
- **CSS Custom Properties** - Theming e variáveis

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod](https://github.com/colinhacks/zod)** - Validação de schemas
- **@hookform/resolvers** - Integração Zod + RHF

### Navigation & State
- **React Router** - Roteamento (via Remix)
- **Context API** - Gerenciamento de estado global
- **Remix Loaders/Actions** - Data fetching e mutações

### Development
- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **TypeScript Compiler** - Verificação de tipos

## ✨ Funcionalidades

### 🔐 Autenticação & Autorização
- Login e registro de usuários
- Proteção de rotas autenticadas
- Gerenciamento de sessão com JWT
- Logout automático em caso de token expirado

### 📊 Gestão de Exames
- **Listagem**: Visualização paginada de todos os exames
- **Criação**: Formulário completo para novos exames
- **Detalhes**: Visualização completa com informações e arquivos
- **Edição**: Atualização de dados do exame
- **Exclusão**: Remoção segura com confirmação

### 📁 Gestão de Arquivos
- **Upload Múltiplo**: Suporte a imagens (PNG, JPG) e PDFs
- **Captura de Fotos**: Integração com câmera do dispositivo
- **Preview**: Visualização inline de imagens e PDFs
- **Download**: Download seguro de arquivos
- **Validação**: Verificação de tipo e tamanho

### 🎨 Interface & UX
- **Design Responsivo**: Adapta-se a todos os tamanhos de tela
- **Loading States**: Indicadores visuais de carregamento
- **Error Handling**: Tratamento elegante de erros
- **Accessibility**: Navegação por teclado, screen readers
- **Toast Messages**: Notificações de sucesso e erro

## 📋 Pré-requisitos

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** v9+ (incluído com Node.js)
- **Git** ([Download](https://git-scm.com/))

### Dependências Externas
- **Backend**: [`dados-saude-backend`](https://github.com/designsystematomic-blip/dados-saude-backend) rodando localmente na porta 8000
- **Design System**: [`dados-saude-lib-components`](https://github.com/designsystematomic-blip/dados-saude-lib-components) [Instalado via NPM no package.json]

## 🛠 Instalação

### 1. Clone e acesse o projeto
```bash
git clone <url-do-repositorio>
cd ./dados-saude-website
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Desenvolvimento com a biblioteca de componentes instalada via NPM

*Caso seja necessário criar novos componentes na biblioteca e queira testá-los localmente nesse front-end, siga o passo 4 abaixo.*

Para este passo 3, será mostrado como o projeto pode ser rodado com a última versão da design system Atomic publicada no [NPM](https://www.npmjs.com/package/design-system-atomic).

### 3.1 Setup do backend

Certifique-se que o back-end esteja rodando na porta 8000. Para isso, verificar o passo a passo de desenvolvimento local descrito no readme.md do projeto: [dados-saude-backend](https://github.com/designsystematomic-blip/dados-saude-backend).

### 3.2. Configure variáveis de ambiente

Crie um arquivo chamado .env na raiz do projeto com base no arquivo .env.exame

ou

```bash
cp .env.example .env
```

Edite o arquivo `.env`:
```env
# API Backend
API_ENDPOINT=http://localhost:8000

# Environment
NODE_ENV=development

```

### 3.3 

Uma vez que o backend está rodando na porta 8000, basta inicializar o front-end:

```bash
npm run dev
```

### 4. Desenvolvimento local com a biblioteca de componentes Design System Atomic

Neste passo, é demonstrado como rodar o front-end junto com a biblioteca de componentes com componentes que ainda estão em construção e não foram publicados.

```bash
git clone https://github.com/designsystematomic-blip/dados-saude-lib-components
```

Acessar a pasta da biblioteca na sua IDE de preferência

```bash
cd ./dados-saude-lib-components && code .
```

Instalar as dependências via terminal

```bash
npm install
```

Tornar a biblioteca linkável via npm

```bash
npm link
```

Rodar o watch da biblioteca para sempre realizar a build a cada alteração feita

```bash
npm run watch
```

A biblioteca já está pronta para ser utilizada por um repositório consumidor React JS.


### 4.1 Volte para o frontend e faça o link

```
cd ../dados-saude-website
npm link design-system-atomic
```

Dessa forma, o projeto já está pronto para ser executado.

## 🚀 Execução

### Desenvolvimento
```bash
npm run dev
```
Acesse: **http://localhost:5173**


## 📁 Estrutura do Projeto

```
dados-saude-website/
├── app/                          # Código principal da aplicação
│   ├── components/               # Componentes específicos da aplicação
│   │   ├── Navbar/              # Navegação principal
│   │   ├── ProtectedRoute/      # Proteção de rotas
│   │   └── Layout/              # Layout base
│   │
│   ├── contexts/                # Contextos React
│   │   └── StoreContext.tsx     # Estado global da aplicação
│   │
│   ├── pages/                   # Páginas da aplicação
│   │   ├── Login/               # Página de login
│   │   ├── Register/            # Página de registro  
│   │   ├── Dashboard/           # Dashboard principal
│   │   ├── ExamList/           # Lista de exames
│   │   ├── ExamNew/            # Criar novo exame
│   │   ├── Exam/               # Detalhes do exame
│   │   └── ExamEdit/           # Editar exame
│   │
│   ├── routes/                  # Rotas do Remix
│   │   ├── _index.tsx          # Página inicial
│   │   ├── login.tsx           # Rota de login
│   │   ├── register.tsx        # Rota de registro
│   │   ├── dashboard.tsx       # Rota do dashboard
│   │   ├── exams.tsx          # Lista de exames
│   │   ├── exam.new.tsx       # Criar exame
│   │   ├── exam.$id.tsx       # Detalhes do exame
│   │   └── exam.$id.edit.tsx  # Editar exame
│   │
│   ├── service/api/            # Serviços de integração com API
│   │   ├── auth.service.ts     # Autenticação
│   │   ├── exam.service.ts     # Gestão de exames
│   │   └── user.service.ts     # Gestão de usuários
│   │
│   ├── zod/                    # Schemas de validação
│   │   ├── auth.schema.ts      # Validações de autenticação
│   │   ├── exam.schema.ts      # Validações de exames
│   │   └── user.schema.ts      # Validações de usuário
│   │
│   ├── global/                 # Tipos e utilitários globais
│   │   ├── user.ts            # Tipos de usuário
│   │   └── constants.ts       # Constantes da aplicação
│   │
│   ├── entry.client.tsx        # Entry point do cliente
│   ├── entry.server.tsx        # Entry point do servidor
│   └── root.tsx               # Componente raiz
│
├── public/                     # Assets estáticos
│   ├── favicon.ico
│   └── images/
│
├── build/                      # Build de produção (gerado)
├── .env                       # Variáveis de ambiente
├── .env.example              # Exemplo de variáveis
├── package.json
├── remix.config.js           # Configuração do Remix
├── tsconfig.json            # Configuração do TypeScript
└── vite.config.ts          # Configuração do Vite
```

## 🛣 Rotas

### Públicas
- `/` - Página inicial
- `/login` - Autenticação
- `/register` - Cadastro de usuário

### Protegidas (requer autenticação)
- `/dashboard` - Dashboard principal
- `/exams` - Lista de exames
- `/exam/new` - Criar novo exame
- `/exam/:id` - Detalhes do exame
- `/exam/:id/edit` - Editar exame

### Padrão de Proteção
```tsx
// Todas as rotas protegidas utilizam o ProtectedRoute
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useStore();
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
}
```

## 🎨 Design System

O frontend utiliza a biblioteca **`design-system-atomic`** - um design system próprio desenvolvido especificamente para este projeto.

### Customização
O design system utiliza CSS Custom Properties para theming:
```css
:root {
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-error: #dc3545;
  --font-family-primary: 'Inter', sans-serif;
}
```

## 🔌 Backend Integration

O frontend se comunica com o backend **`dados-saude-backend`** através de uma API REST.

### Configuração
```typescript
// service/api/base.ts
const API_BASE_URL = process.env.API_ENDPOINT || 'http://localhost:8000';
```

### Serviços Implementados

#### AuthService
```typescript
class AuthService {
  async login(credentials: LoginData): Promise<AuthResponse>
  async register(userData: RegisterData): Promise<AuthResponse>
  async getProfile(token: string): Promise<User>
}
```

#### ExamService  
```typescript
class ExamService {
  async getExams(params: GetExamsParams): Promise<Exam[]>
  async createExam(data: CreateExamData): Promise<Exam>
  async getExamById(id: string): Promise<Exam>
  async updateExam(id: string, data: UpdateExamData): Promise<Exam>
  async deleteExam(id: string): Promise<void>
  async getFileStreamUrl(fileId: string): string
  async downloadFile(fileId: string): Promise<Blob>
}
```

### Autenticação
```typescript
// Headers automáticos para requests autenticados
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

### Tratamento de Erros
```typescript
// Interceptação global de erros
if (response.status === 401) {
  // Token expirado - redirect para login
  window.location.href = '/login';
}
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento (porta 5173)

# Build  
npm run build           # Gera build de produção
npm run preview         # Preview do build de produção

# Qualidade de Código
npm run typecheck       # Verificação de tipos TypeScript
npm run lint           # Linting com ESLint
npm run lint:fix       # Corrige erros de linting automaticamente

# Dependências
npm run postinstall    # Executado automaticamente após npm install
```

## 🤝 Dependências do Projeto

### Principais Dependências Externas

#### Backend API
- **Repositório**: [`dados-saude-backend`](https://github.com/designsystematomic-blip/dados-saude-backend)
- **Tecnologia**: Node.js + Express + Prisma
- **Porta**: 8000
- **Funcionalidades**: Autenticação, CRUD de exames, upload de arquivos

#### Design System
- **Repositório**: [`dados-saude-lib-components`](https://github.com/designsystematomic-blip/dados-saude-lib-components)  
- **Tecnologia**: React + TypeScript + CSS Modules
- **Componentes**: 11 componentes reutilizáveis
- **Funcionalidades**: UI consistente e acessível

### Integração Local
```bash
# Para desenvolvimento, certifique-se de que estejam rodando:

# 1. Backend (Terminal 1)
cd dados-saude-backend && npm run dev

# 2. Design System (Terminal 3 - opcional)
cd dados-saude-lib-components && npm link 

# 3. Frontend (Terminal 2)  
cd dados-saude-website && npm link design-system-atomic && npm run dev
```

## 📝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'feat: add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

### Padrões de Commit
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação de código
- `refactor:` - Refatoração
- `test:` - Testes

---

**⚡ Dados Saúde Frontend** - Interface moderna e acessível para gestão de dados de saúde, desenvolvida com React/Remix e design system próprio.

💙 Desenvolvido com foco em **acessibilidade**, **performance** e **experiência do usuário**.

## 📝 Licença

Este projeto é parte do projeto de conclusão de pós-graduação do IFBA.

## 👥 Dúvidas?

amandaprates1997@gmail.com
