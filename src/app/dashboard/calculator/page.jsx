"use client";

import { useState } from "react";
import { Calculator as CalculatorIcon, Leaf, Gift, Minus, Plus, MapPin } from "lucide-react";
import Link from "next/link";

export default function CalculatorPage() {
  const [donatedItems, setDonatedItems] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [environmentalImpact, setEnvironmentalImpact] = useState({
    co2: 0,
    water: 0,
    landfill: 0,
  });

  const handleDonatedItemsChange = (e) => {
    const value = Math.min(20, Math.max(0, parseInt(e.target.value) || 0));
    setDonatedItems(value);
    calculateDiscountAndImpact(value);
  };

  const calculateDiscountAndImpact = (items) => {
    const calculatedDiscount = Math.min(50, items * 2.5);
    setDiscount(calculatedDiscount);

    const co2ReducedPerItem = 0.5;
    const waterSavedPerItem = 50;
    const landfillReducedPerItem = 0.2;

    setEnvironmentalImpact({
      co2: (items * co2ReducedPerItem).toFixed(1),
      water: (items * waterSavedPerItem).toFixed(0),
      landfill: (items * landfillReducedPerItem).toFixed(1),
    });
  };

  return (
    <div className="p-4 md:p-8 space-y-6 bg-[#F8F5ED]">
      
      {/* Header eco */}
      <div className="rounded-xl p-6 shadow-sm border border-[#D6CBB8] bg-gradient-to-r from-[#CEB294] to-[#A7C08B] text-white flex items-center gap-3">
        <CalculatorIcon size={32} />
        <div>
          <h1 className="text-3xl font-bold">Calculadora Sustentável</h1>
          <p className="text-[#F8F5ED] text-sm">
            Veja o impacto positivo das suas doações 🌍✨
          </p>
        </div>
      </div>

      {/* Card principal */}
      <div className="bg-white/95 rounded-xl p-6 shadow-sm border border-[#D6CBB8] space-y-6">

        <h2 className="text-xl font-semibold text-gray-800">
          Sua Contribuição para o Planeta
        </h2>

        {/* Contador */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantos itens você doou? (Máx. 20)
          </label>
          <div className="flex items-center gap-2 border border-[#C7B9A3] rounded-lg w-fit bg-white">
            <button
              onClick={() => handleDonatedItemsChange({ target: { value: donatedItems - 1 } })}
              className="p-2 hover:bg-[#EFE8D6]"
              disabled={donatedItems <= 0}
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-2 min-w-[3rem] text-center">{donatedItems}</span>
            <button
              onClick={() => handleDonatedItemsChange({ target: { value: donatedItems + 1 } })}
              className="p-2 hover:bg-[#EFE8D6]"
              disabled={donatedItems >= 20}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Desconto */}
        <div className="flex items-center gap-4 p-4 bg-[#F2F8F0] rounded-lg border border-[#9BB88A]">
          <Gift className="text-[#6B8E63]" size={28} />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Seu Desconto ReArt:</h3>
            <p className="text-3xl font-bold text-[#6B8E63]">{discount.toFixed(0)}% OFF</p>
            <p className="text-sm text-gray-600">Recompensa pelo seu cuidado com o planeta 🌱</p>
          </div>
        </div>

        {/* Impacto Ambiental */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Leaf className="text-[#6B8E63]" size={20} />
            Impacto Ambiental Positivo
          </h3>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#E9EFE4] p-4 rounded-lg border border-[#B7C7A5] text-center">
              <p className="text-2xl font-bold text-[#6B8E63]">{environmentalImpact.co2} kg</p>
              <p className="text-sm text-gray-600">CO₂ Reduzido</p>
            </div>
            <div className="bg-[#E4F1EB] p-4 rounded-lg border border-[#A9C5B6] text-center">
              <p className="text-2xl font-bold text-[#6B8E63]">{environmentalImpact.water} L</p>
              <p className="text-sm text-gray-600">Água Economizada</p>
            </div>
            <div className="bg-[#F3EBDF] p-4 rounded-lg border border-[#D6C1A8] text-center">
              <p className="text-2xl font-bold text-[#6B8E63]">{environmentalImpact.landfill} kg</p>
              <p className="text-sm text-gray-600">Lixo Desviado</p>
            </div>
          </div>
        </div>

        {/* Botão */}
        <Link
          href="/dashboard/map"
          className="w-full flex items-center justify-center gap-2 bg-[#6B8E63] hover:bg-[#57764E] text-white font-semibold py-3 rounded-lg transition shadow-sm"
        >
          <MapPin size={20} />
          Encontrar Pontos de Coleta
        </Link>
      </div>
    </div>
  );
}
