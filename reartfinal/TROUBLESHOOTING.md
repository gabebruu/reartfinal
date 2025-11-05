# Resolução de Problemas - NextAuth

## Erro: CLIENT_FETCH_ERROR

### Problemas Corrigidos:

1. ✅ **Middleware corrigido** - Agora não interfere nas rotas `/api/auth/*`
2. ✅ **Google Provider opcional** - Só é carregado se as credenciais estiverem configuradas
3. ✅ **Página de login** - Só mostra botão do Google se o provider estiver disponível

### Verificações Necessárias:

#### 1. Variáveis de Ambiente

Certifique-se de que o arquivo `.env.local` existe na raiz do projeto e contém:

```env
MONGODB_URI=mongodb://localhost:27017/reartdb
NEXTAUTH_SECRET=sua-chave-secreta-aqui
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

**IMPORTANTE:**
- `NEXTAUTH_SECRET` é **OBRIGATÓRIO** e deve ser uma string aleatória
- `NEXTAUTH_URL` deve corresponder à URL do seu ambiente:
  - Desenvolvimento: `http://localhost:3000`
  - Produção: `https://seu-dominio.com`

#### 2. Gerar NEXTAUTH_SECRET

**Windows PowerShell:**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

**Linux/Mac:**
```bash
openssl rand -base64 32
```

**Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### 3. Reiniciar o Servidor

Após criar/editar o `.env.local`, **sempre reinicie o servidor**:

```bash
# Pare o servidor (Ctrl+C)
# Depois inicie novamente:
npm run dev
```

#### 4. Verificar Rotas

Teste se as rotas do NextAuth estão funcionando:

- `http://localhost:3000/api/auth/providers` - Deve retornar JSON
- `http://localhost:3000/api/auth/session` - Deve retornar JSON (mesmo que null)

Se retornar HTML (página de erro) ao invés de JSON, verifique:
1. Se o arquivo `.env.local` existe e está correto
2. Se o servidor foi reiniciado após criar o arquivo
3. Se não há erros no console do servidor

#### 5. Verificar Console do Servidor

Abra o terminal onde o servidor está rodando e verifique se há erros relacionados a:
- MongoDB connection
- NextAuth configuration
- Missing environment variables

## Estrutura de Arquivos Corrigida

```
src/
├── middleware.js              ✅ Corrigido - não interfere em /api/auth/*
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/
│   │       │   └── route.js   ✅ Corrigido - Google Provider opcional
│   │       └── register/
│   │           └── route.js   ✅ Criado
│   └── page.js                ✅ Corrigido - verifica providers disponíveis
```

## Próximos Passos

1. Crie o arquivo `.env.local` com as variáveis necessárias
2. Gere um `NEXTAUTH_SECRET` seguro
3. Reinicie o servidor (`npm run dev`)
4. Teste o login com email/senha
5. (Opcional) Configure Google OAuth se necessário

## Se o Problema Persistir

1. Limpe o cache do Next.js:
   ```bash
   rm -rf .next
   npm run dev
   ```

2. Verifique se o MongoDB está rodando:
   ```bash
   # Se estiver usando MongoDB local
   mongod
   ```

3. Verifique os logs do servidor para erros específicos

4. Teste a rota diretamente no navegador:
   - `http://localhost:3000/api/auth/providers`
   - Deve retornar um objeto JSON com os providers disponíveis

