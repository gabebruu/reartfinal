"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { Heart, Package, X } from "lucide-react";

export default function FavoritesPage() {
  const { favorites, loading, toggleFavorite } = useFavorites();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F8F5ED]">
        <span className="animate-pulse text-gray-600 text-lg">
          Carregando favoritos...
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6 bg-[#F8F5ED]">
      
      {/* Header Artesanal */}
      <div className="rounded-xl p-6 shadow-sm border border-[#D6CBB8] bg-gradient-to-r from-[#CEB294] to-[#A7C08B] text-white flex items-center gap-3">
        <Heart size={32} />
        <div>
          <h1 className="text-3xl font-bold">Meus Favoritos</h1>
          <p className="text-[#F8F5ED] text-sm">
            Peças que combinam com sua essência 🌿✨
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        // Estado vazio com mensagem eco-friendly
        <div className="bg-white/90 rounded-xl p-12 text-center shadow-sm border border-[#D6CBB8]">
          <Package className="mx-auto text-[#BFAE94] mb-4" size={64} />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Nenhum favorito ainda
          </h2>
          <p className="text-gray-500 mb-2">
            Quando algo tocar seu coração, marque como favorito ❤️
          </p>
          <p className="text-[#6B8E63] font-semibold">
            A moda consciente começa pelo afeto.
          </p>
        </div>
      ) : (
        // Grid de favoritos com estilo reciclável
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites.map((item, index) => (
            <div
              key={index}
              className="bg-white/95 rounded-xl overflow-hidden shadow-sm border border-[#D6CBB8] hover:shadow-md transition"
            >
              <div className="relative">
                <img
                  src={item.src}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                {/* Remover / Desfavoritar */}
                <button
                  onClick={() => toggleFavorite(item)}
                  className="absolute top-2 right-2 bg-white/80 backdrop-blur px-2 py-1 rounded-full text-[#A75A54] hover:text-gray-700 transition"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                <p className="text-lg font-bold text-[#6B8E63] mt-3">
                  €{item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
