"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, Heart, User, Calculator } from "lucide-react";
import "leaflet/dist/leaflet.css";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/dashboard/cart", label: "Cart", icon: ShoppingCart },
    { href: "/dashboard/favorites", label: "Favorites", icon: Heart },
    { href: "/dashboard/calculator", label: "Calculator", icon: Calculator },
    { href: "/dashboard/artist", label: "Artist", icon: User },
    { href: "/dashboard/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar Desktop - FIXA */}
      <aside className="hidden md:flex md:flex-col fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-40">
        <div className="p-6 border-b border-gray-200 flex justify-center">
          <img
            src="/logoreart.png"
            alt="ReArt"
            className="h-10 w-auto object-contain"
          />
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col md:ml-64">
        {/* Header mobile */}
        <header className="md:hidden bg-white border-b  h-16 flex items-center justify-center">
          <img
            src="/logoreart.png"
            alt="ReArt"
            className="h-22 w-auto object-contain"
          />
        </header>

        {/* Área de conteúdo */}
        <div className="flex-1 overflow-auto pb-20 md:pb-0">
          {children}
        </div>

        {/* Bottom Nav Mobile - FIXA */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t px-2 py-3 flex items-center justify-around z-40">
          {navItems.slice(0, 5).map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center transition ${
                  active ? "text-green-600" : "text-gray-500"
                }`}
              >
                <Icon size={20} />
                <span className="text-xs">{label}</span>
              </Link>
            );
          })}
        </nav>
      </main>
    </div>
  );
}