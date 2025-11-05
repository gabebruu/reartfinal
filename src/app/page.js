"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogIn, Mail, Lock, UserPlus } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasGoogleProvider, setHasGoogleProvider] = useState(false);

  useEffect(() => {
    if (status === "authenticated") router.push("/dashboard");
    
    // Carregar o último email salvo do localStorage (apenas no cliente)
    if (typeof window !== "undefined") {
      const lastEmail = localStorage.getItem("lastLoggedInEmail");
      if (lastEmail) {
        setEmail(lastEmail);
      }
    }

    // Verificar se o Google Provider está disponível
    // Tentar buscar da API, mas não quebrar se falhar
    const checkProviders = async () => {
      try {
        const res = await fetch("/api/auth/providers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Verificar se a resposta é JSON
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          // Se não for JSON, provavelmente é HTML de erro - não mostrar Google Provider
          setHasGoogleProvider(false);
          return;
        }

        if (!res.ok) {
          // Se a resposta não for OK, não mostrar Google Provider
          setHasGoogleProvider(false);
          return;
        }

        // Tentar parsear JSON, mas tratar erros
        let providers;
        try {
          const text = await res.text();
          providers = JSON.parse(text);
        } catch (parseError) {
          // Se não conseguir parsear como JSON, não mostrar Google Provider
          setHasGoogleProvider(false);
          return;
        }

        if (providers && typeof providers === "object") {
          setHasGoogleProvider(!!providers?.google);
        } else {
          setHasGoogleProvider(false);
        }
      } catch (error) {
        // Qualquer erro - simplesmente não mostrar o botão do Google
        // Não logar o erro para evitar poluir o console
        setHasGoogleProvider(false);
      }
    };

    checkProviders();
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <span className="animate-pulse text-gray-600 text-lg">Carregando...</span>
      </div>
    );
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao criar conta");
        setLoading(false);
        return;
      }

      setSuccess("Conta criada com sucesso! Faça login.");
      setIsRegistering(false);
      setName("");
      setLoading(false);
    } catch (err) {
      console.error("Erro no registro:", err);
      setError("Erro ao criar conta. Tente novamente.");
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Email ou senha incorretos");
        setLoading(false);
        return;
      }

      if (res?.ok) {
        if (typeof window !== "undefined") {
          localStorage.setItem("lastLoggedInEmail", email); // Salva o email no localStorage
        }
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Erro ao fazer login. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-200 flex items-center justify-center p-2">

      <div className="bg-white w-full max-w-[390px] h-[844px] shadow-xl rounded-2xl overflow-hidden flex flex-col justify-between">

        {/* Header */}
        <div className="text-center pt-16 px-6">
          <h1 className="text-4xl font-extrabold text-green-600">ReArt</h1>
          <p className="mt-2 text-gray-500 text-sm">
            Moda circular. Impacto real 🌍
          </p>
        </div>

        {/* Form */}
        <div className="px-6 space-y-4 flex-1 flex flex-col justify-center">

          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-3">
            {isRegistering && (
              <div className="flex items-center bg-gray-100 px-3 py-3 rounded-xl gap-2">
                <UserPlus size={20} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent w-full text-sm outline-none"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div className="flex items-center bg-gray-100 px-3 py-3 rounded-xl gap-2">
              <Mail size={20} className="text-gray-500" />
              <input
                type="email"
                placeholder="teuemail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent w-full text-sm outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="flex items-center bg-gray-100 px-3 py-3 rounded-xl gap-2">
              <Lock size={20} className="text-gray-500" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent w-full text-sm outline-none"
                required
                minLength={6}
              />
            </div>

            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            {success && <p className="text-green-500 text-xs text-center">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-pulse">Processando...</span>
              ) : (
                <>
                  {isRegistering ? <UserPlus size={20} /> : <LogIn size={20} />}
                  {isRegistering ? "Criar conta" : "Entrar"}
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError("");
                setSuccess("");
              }}
              className="w-full text-sm text-gray-600 hover:text-gray-800 transition"
            >
              {isRegistering
                ? "Já tem uma conta? Faça login"
                : "Não tem uma conta? Criar conta"}
            </button>
          </form>

          {/* Google Login - apenas se o provider estiver disponível */}
          {hasGoogleProvider && (
            <>
              {/* Divider */}
              <div className="flex items-center justify-center gap-4 my-2">
                <span className="h-px bg-gray-200 w-1/3"></span>
                <span className="text-xs text-gray-400">ou</span>
                <span className="h-px bg-gray-200 w-1/3"></span>
              </div>

              {/* Google Login */}
              <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-3 text-gray-700 font-medium hover:bg-gray-50 active:scale-95 transition"
              >
                <Image
                  src="/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  priority
                />
                Continuar com Google
              </button>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="py-6 text-xs text-center text-gray-400">
          © 2025 ReArt
        </div>
      </div>
    </div>
  );
}
