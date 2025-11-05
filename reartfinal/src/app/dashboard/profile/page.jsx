"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Edit, Save, LogOut, Camera } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (session) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || "",
      });
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F8F4ED]">
        <span className="animate-pulse text-[#7A5F47] text-lg">Carregando perfil...</span>
      </div>
    );
  }

  if (!session) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    console.log("Saving data:", formData);
    await update({
      user: {
        name: formData.name,
        email: formData.email,
        image: formData.image,
      },
    });
    setIsEditing(false);
  };

  const handleImageChange = () => {
    const newImageUrl = prompt("Insira a nova URL da imagem de perfil:", formData.image);
    if (newImageUrl) {
      setFormData((prev) => ({ ...prev, image: newImageUrl }));
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 relative bg-[#F8F4ED] min-h-screen">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#3B7F4A]">Meu Perfil</h1>
          <p className="text-[#7A5F47] text-sm">Gerencie suas informações pessoais</p>
        </div>
        <User className="text-[#3B7F4A]" size={28} />
      </div>

      {/* Card de Perfil */}
      <div className="bg-white rounded-xl p-6 border border-[#3B7F4A]/20 shadow-sm space-y-6">
        {/* Foto de Perfil */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={formData.image || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
              alt="Foto de Perfil"
              className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-[#3B7F4A]/40 shadow-sm"
            />
            {isEditing && (
              <button
                onClick={handleImageChange}
                className="absolute bottom-0 right-0 bg-[#3B7F4A] hover:bg-[#31633B] text-white p-1.5 rounded-full shadow-md transition-transform hover:scale-105"
                title="Trocar foto"
              >
                <Camera size={18} />
              </button>
            )}
          </div>
          {!isEditing && (
            <h2 className="text-lg md:text-xl font-bold text-[#3B7F4A]">{session.user.name}</h2>
          )}
        </div>

        {/* Campos */}
        <div className="space-y-4">
          <div>
            <label className="block text-[#7A5F47] text-sm font-medium mb-1">Nome</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#7A5F47]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B7F4A] bg-[#F8F4ED]"
              />
            ) : (
              <p className="px-3 py-2 bg-[#F8F4ED] rounded-lg text-[#3B7F4A] font-medium">{formData.name}</p>
            )}
          </div>

          <div>
            <label className="block text-[#7A5F47] text-sm font-medium mb-1">E-mail</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#7A5F47]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B7F4A] bg-[#F8F4ED]"
              />
            ) : (
              <p className="px-3 py-2 bg-[#F8F4ED] rounded-lg text-[#3B7F4A] font-medium">{formData.email}</p>
            )}
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 bg-[#3B7F4A] hover:bg-[#31633B] text-white px-4 py-2 rounded-lg transition shadow-sm"
            >
              <Save size={18} />
              Salvar
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center gap-2 bg-[#3B7F4A] hover:bg-[#31633B] text-white px-4 py-2 rounded-lg transition shadow-sm"
            >
              <Edit size={18} />
              Editar Perfil
            </button>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center justify-center gap-2 bg-[#7A5F47] hover:bg-[#664D3A] text-white px-4 py-2 rounded-lg transition shadow-sm"
          >
            <LogOut size={18} />
            Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
}