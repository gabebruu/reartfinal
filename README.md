# ReArt - Moda Circular Sustentável

Projeto Next.js com NextAuth para autenticação de usuários.

## 🚀 Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/reartdb
# ou use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/reartdb

# NextAuth (OBRIGATÓRIO)
NEXTAUTH_SECRET=sua-chave-secreta-aqui-gerere-uma-string-aleatoria
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (opcional - para login com Google)
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret

# Node Environment
NODE_ENV=development
```

**Importante:** 
- Gere um `NEXTAUTH_SECRET` seguro usando: `openssl rand -base64 32`
- Ou use qualquer string aleatória longa

### 3. Executar o projeto

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 🔐 Autenticação

O projeto usa NextAuth com os seguintes provedores:

- **Credentials**: Login com email e senha
- **Google OAuth**: Login com conta Google

### Funcionalidades

- ✅ Registro de novos usuários
- ✅ Login com email/senha
- ✅ Login com Google
- ✅ Proteção de rotas (middleware)
- ✅ Sessão JWT

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/route.js  # Configuração NextAuth
│   │       └── register/route.js        # API de registro
│   ├── dashboard/                       # Páginas protegidas
│   ├── page.js                          # Página de login
│   └── layout.js                        # Layout principal
├── components/                          # Componentes React
├── database/
│   ├── connection.js                    # Conexão MongoDB
│   └── models/                          # Modelos Mongoose
└── middleware.js                        # Middleware de proteção
```

## 🛠️ Tecnologias

- Next.js 16
- NextAuth v4
- MongoDB (Mongoose)
- bcryptjs (hash de senhas)
- Tailwind CSS

## 📝 Notas

- O projeto usa MongoDB para armazenar usuários
- Senhas são hasheadas com bcryptjs
- Usuários do Google não têm senha no banco
