"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingCart, Trash2, Plus, Minus, Package, Leaf } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, loading, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8 bg-[#F8F5ED] font-sans">
      {/* Header eco / artesanal */}
      <div className="relative rounded-xl p-6 shadow-md border border-[#D6CBB8] bg-gradient-to-r from-[#CEB294] to-[#A7C08B] text-white overflow-hidden">
        <div className="absolute top-2 right-3 opacity-20">
          <Leaf size={48} />
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-2 rounded-full">
            <ShoppingCart size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Carrinho de Compras</h1>
        </div>
        <p className="text-[#F8F5ED] mt-2 text-sm md:text-base font-light">
          Cada peça conta uma história de reuso ♻️✨
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#A7C08B] mb-3"></div>
            <p className="text-gray-600">Preparando sua seleção sustentável…</p>
          </div>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="bg-white/90 rounded-xl p-8 md:p-12 text-center shadow-sm border border-[#D6CBB8] max-w-2xl mx-auto">
          <div className="inline-block p-4 bg-[#F0E8D5] rounded-full mb-5">
            <Package className="text-[#BFAE94]" size={56} />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Seu carrinho está vazio
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-4">
            A moda consciente começa com escolhas que respeitam a Terra 🌍
          </p>
          <p className="text-[#6B8E63] font-medium mb-6">
            Descubra peças únicas feitas com materiais reciclados.
          </p>
          <Link
            href="/produtos"
            className="inline-block bg-[#6B8E63] hover:bg-[#57764E] text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Explorar Coleção
          </Link>
        </div>
      ) : (
        <>
          {/* Lista de itens */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-sm border border-[#D6CBB8] divide-y divide-[#ECE5D8] overflow-hidden">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="p-5 md:p-6 flex flex-col md:flex-row gap-5 items-center justify-between hover:bg-[#FDFCF8] transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <img
                    src={item.src}
                    alt={item.name}
                    className="w-16 md:w-20 h-16 md:h-20 object-cover rounded-xl border border-[#E9E2D2] shadow-sm"
                  />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                    <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-1">{item.description}</p>
                    <p className="text-lg font-bold text-[#6B8E63] mt-1">
                      €{item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Quantidade */}
                  <div className="flex items-center gap-1 border border-[#C7B9A3] rounded-lg bg-white shadow-sm">
                    <button
                      onClick={() => updateQuantity(item.name, -1)}
                      className="p-2 hover:bg-[#F3F0E8] transition-colors rounded-l-lg"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} className="text-gray-700" />
                    </button>
                    <span className="px-3 py-2 min-w-[2.5rem] text-center font-medium text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.name, 1)}
                      className="p-2 hover:bg-[#F3F0E8] transition-colors rounded-r-lg"
                    >
                      <Plus size={14} className="text-gray-700" />
                    </button>
                  </div>

                  {/* Remover item */}
                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Remover item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-[#D6CBB8] max-w-lg w-full mx-auto">
            <div className="space-y-3 mb-5">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-lg font-medium">€{total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Frete</span>
                <span className="text-lg font-medium text-[#6B8E63] flex items-center gap-1">
                  Grátis <Leaf size={16} className="text-[#6B8E63]" />
                </span>
              </div>

              <div className="border-t border-[#E6DCC8] pt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-[#6B8E63]">
                  €{total.toFixed(2)}
                </span>
              </div>
            </div>

            <button className="w-full mt-2 bg-[#6B8E63] hover:bg-[#57764E] active:scale-[0.99] transition-all duration-200 text-white font-semibold py-3.5 rounded-lg shadow-md hover:shadow-lg">
              Finalizar Compra
            </button>

            <p className="text-center text-xs text-gray-500 mt-3">
              Sua compra apoia o artesanato sustentável ♻️
            </p>
          </div>
        </>
      )}
    </div>
  );
}