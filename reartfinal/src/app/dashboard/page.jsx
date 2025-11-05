"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { X, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F8F4ED]">
        <span className="animate-pulse text-gray-600 text-lg">Carregando...</span>
      </div>
    );
  }

  if (!session) return null;

  const gallery = [
    {
      src: "/capa.jpg",
      name: "Capa de chuva ReArt Denim",
      description: "Feita com plástico reciclado e detalhes pintados à mão.",
      price: 19.9,
    },
    {
      src: "/casaco.jpg",
      name: "Casaco Eco Urbana",
      description: "Produzida com sobras de plásticos e materiais sustentáveis.",
      price: 34.9,
    },
    {
      src: "/gravata.jpg",
      name: "Terno de gravata",
      description: "Tecido 100% reciclado com estampa exclusiva ReArt.",
      price: 44.9,
    },
    {
      src: "/jacketa.jpg",
      name: "Jacketa Upcycled",
      description: "Peça única recriada a partir de roupas doadas.",
      price: 24.9,
    },
    {
      src: "/short.jpg",
      name: "Short Vintage Rework",
      description: "Modelagem moderna feita a partir de shorts vintage.",
      price: 9.9,
    },
    {
      src: "/terno.jpg",
      name: "Terno Sustentável",
      description: "Feito com plástico orgânico e fibras recicladas.",
      price: 29.9,
    },
  ];

  const userImage =
    session?.user?.image ||
    "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  const handleAddToCart = (item) => {
    addToCart(item);
    setToastMessage(`${item.name} foi adicionado ao carrinho 🛒`);
    setShowToast(true);
    setSelectedItem(null);
    setTimeout(() => {
      setShowToast(false);
      router.push("/dashboard/cart");
    }, 1200);
  };

  const handleToggleFavorite = (item) => {
    toggleFavorite(item);
    const message = isFavorite(item.name)
      ? `${item.name} removido dos favoritos`
      : `${item.name} adicionado aos favoritos ❤️`;
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 relative bg-[#F8F4ED] min-h-screen">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#3B7F4A]">
            Bem-vinda, {session?.user?.name || "Usuário"}
          </h1>
          <p className="text-[#7A5F47] text-sm">Onde o descarte vira desejo.</p>
        </div>

        <img
          src={userImage}
          alt="Foto de perfil"
          className="w-14 h-14 rounded-full border-2 border-[#3B7F4A]/40 shadow-sm object-cover cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => router.push("/dashboard/profile")}
        />
      </div>

      {/* Galeria */}
      <h2 className="text-xl font-bold text-[#3B7F4A]">Peças assinadas por Fábio</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {gallery.map((item, index) => (
          <div
            key={index}
            className="group hover:-translate-y-1 transition-transform cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <div className="relative rounded-lg overflow-hidden shadow-sm border border-[#7A5F47]/20 hover:shadow-md transition-all bg-white">
              <img
                src={item.src}
                alt={item.name}
                className="w-full h-40 object-cover"
              />

              {/* Botão de favoritar — no canto superior direito da imagem */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Impede que o modal abra ao clicar no coração
                  handleToggleFavorite(item);
                }}
                className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white z-10"
                aria-label={
                  isFavorite(item.name)
                    ? "Remover dos favoritos"
                    : "Adicionar aos favoritos"
                }
              >
                <Heart
                  size={18}
                  className={`${
                    isFavorite(item.name)
                      ? "fill-[#3B7F4A] text-[#3B7F4A]"
                      : "text-[#7A5F47]"
                  }`}
                />
              </button>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-black/5 transition-opacity pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      {/* Info Card */}
      <div className="bg-[#DDEFE4] rounded-xl p-6 border border-[#3B7F4A]/30 shadow-sm">
        <h3 className="text-lg font-semibold text-[#3B7F4A] mb-2">💡 Sobre o ReArt</h3>
        <p className="text-[#7A5F47] text-sm">
          A ReArt é uma plataforma de moda circular que transforma doações de roupas e resíduos têxteis em peças únicas, sustentáveis e carregadas de propósito. Por meio de processos artesanais e de baixo impacto ambiental, resgatamos materiais que iriam para o descarte e lhes damos nova vida, evitando o consumo de recursos virgens e reduzindo a poluição da indústria da moda.
        </p>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full shadow-lg relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <img
              src={selectedItem.src}
              alt={selectedItem.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />

            <div className="p-5">
              <h3 className="text-lg font-bold text-[#3B7F4A] mb-1">
                {selectedItem.name}
              </h3>
              <p className="text-sm text-[#7A5F47] mb-3">
                {selectedItem.description}
              </p>
              <p className="text-lg font-semibold text-[#3B7F4A] mb-4">
                €{selectedItem.price.toFixed(2)}
              </p>

              <button
                onClick={() => handleAddToCart(selectedItem)}
                className="w-full bg-[#3B7F4A] hover:bg-[#31633B] text-white font-medium py-2 rounded-lg transition shadow-sm"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-[#3B7F4A] text-white px-4 py-2 rounded-lg shadow-xl text-sm animate-fadeIn z-50">
          {toastMessage}
        </div>
      )}
    </div>
  );
}