"use client";

import { User, Instagram, MapPin, Palette } from "lucide-react";
import artistData from "@/data/artist.json";

export default function ArtistPage() {
  return (
    <div className="p-4 md:p-8 space-y-6 bg-[#F8F4ED] min-h-screen">

      {/* Artist Profile */}
      <div className="bg-[#DDEFE4] rounded-xl p-6 border border-[#3B7F4A]/30 shadow-sm">
        <div className="flex items-center gap-5">

          {/* Foto do Artista */}
          <img
            src={artistData.image}
            alt={artistData.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-[#3B7F4A]/50 shadow-sm"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#3B7F4A] mb-1">
              {artistData.name}
            </h1>
            <p className="text-[#7A5F47] mb-3 leading-relaxed">
              {artistData.bio}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-[#7A5F47]">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#3B7F4A]" />
                <span>{artistData.location}</span>
              </div>

              {artistData.socials?.instagram && (
                <a
                  href={artistData.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline hover:text-[#3B7F4A] transition-colors"
                >
                  <Instagram size={16} className="text-[#3B7F4A]" />
                  <span>Instagram</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sobre o Artista */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#7A5F47]/20">
        <h2 className="text-xl font-bold text-[#3B7F4A] mb-3 flex items-center gap-2">
          <Palette size={24} className="text-[#3B7F4A]" />
          Missão do Artista
        </h2>

        <p className="text-[#7A5F47] leading-relaxed mb-3">
          {artistData.mission}
        </p>

        <div className="bg-[#DDEFE4] border border-[#3B7F4A]/30 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-[#3B7F4A]">
            <strong>✨ Destaque:</strong> {artistData.highlight}
          </p>
        </div>
      </div>

    </div>
  );
}
