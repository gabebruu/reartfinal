// Script para verificar variáveis de ambiente
// Execute: node scripts/check-env.js

const required = {
    MONGODB_URI: "MongoDB connection string",
    NEXTAUTH_SECRET: "NextAuth secret key",
    NEXTAUTH_URL: "NextAuth URL (opcional, padrão: http://localhost:3000)",
};

const optional = {
    GOOGLE_CLIENT_ID: "Google OAuth Client ID",
    GOOGLE_CLIENT_SECRET: "Google OAuth Client Secret",
    NODE_ENV: "Node environment",
};

console.log("🔍 Verificando variáveis de ambiente...\n");

let hasErrors = false;

// Verificar variáveis obrigatórias
console.log("📋 Variáveis Obrigatórias:");
for (const [key, description] of Object.entries(required)) {
    const value = process.env[key];
    if (value) {
        if (key === "NEXTAUTH_SECRET") {
            console.log(`  ✅ ${key}: ${value.length >= 32 ? "✓ Configurado (" + value.length + " caracteres)" : "⚠️ Muito curto (mínimo 32 caracteres)"}`);
        } else {
            console.log(`  ✅ ${key}: Configurado`);
        }
    } else {
        console.log(`  ❌ ${key}: NÃO CONFIGURADO - ${description}`);
        hasErrors = true;
    }
}

console.log("\n📋 Variáveis Opcionais:");
for (const [key, description] of Object.entries(optional)) {
    const value = process.env[key];
    if (value) {
        console.log(`  ✅ ${key}: Configurado`);
    } else {
        console.log(`  ⚠️  ${key}: Não configurado - ${description}`);
    }
}

if (hasErrors) {
    console.log("\n❌ Erro: Variáveis obrigatórias não configuradas!");
    console.log("\n📝 Crie um arquivo .env.local na raiz do projeto com:");
    console.log("\nMONGODB_URI=mongodb://localhost:27017/reartdb");
    console.log("NEXTAUTH_SECRET=sua-chave-secreta-aqui");
    console.log("NEXTAUTH_URL=http://localhost:3000\n");
    process.exit(1);
} else {
    console.log("\n✅ Todas as variáveis obrigatórias estão configuradas!");
    process.exit(0);
}

