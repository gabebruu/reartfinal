# Configuração de Variáveis de Ambiente

## Arquivo .env.local

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# MongoDB (OBRIGATÓRIO)
MONGODB_URI=mongodb://localhost:27017/reartdb

# NextAuth (OBRIGATÓRIO)
NEXTAUTH_SECRET=sua-chave-secreta-aqui
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (OPCIONAL - apenas se quiser usar login com Google)
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret

# Node Environment
NODE_ENV=development
```

## Como gerar NEXTAUTH_SECRET

### Opção 1: Usando OpenSSL (Linux/Mac)
```bash
openssl rand -base64 32
```

### Opção 2: Usando Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Opção 3: Usando PowerShell (Windows)
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

### Opção 4: Gerador online
Você pode usar qualquer gerador de string aleatória online. A string deve ter pelo menos 32 caracteres.

## Exemplo de .env.local

```env
MONGODB_URI=mongodb://localhost:27017/reartdb
NEXTAUTH_SECRET=MeuSegredoSuperSeguro123456789012345678901234567890
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

## Configuração do MongoDB

### MongoDB Local
Se você tem MongoDB instalado localmente:
```env
MONGODB_URI=mongodb://localhost:27017/reartdb
```

### MongoDB Atlas (Cloud)
1. Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie um cluster gratuito
3. Crie um usuário e obtenha a string de conexão
4. Use no formato:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/reartdb
```

## Configuração do Google OAuth (Opcional)

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Vá para "APIs & Services" > "Credentials"
4. Clique em "Create Credentials" > "OAuth client ID"
5. Configure:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
6. Copie o Client ID e Client Secret para o `.env.local`

## Verificação

Após criar o `.env.local`, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

Se tudo estiver correto, você verá:
- ✅ Mensagem de conexão com MongoDB no console
- ✅ Página de login carregando sem erros

