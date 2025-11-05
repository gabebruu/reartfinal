
"use client";

import { createContext, useState, useEffect, useContext } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar favoritos do localStorage ao iniciar
  useEffect(() => {
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }
    try {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites);
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualiza o localStorage sempre que os favoritos mudarem
  useEffect(() => {
    if (typeof window === "undefined" || loading) return;
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage", error);
    }
  }, [favorites, loading]);

  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const itemIndex = prevFavorites.findIndex((i) => i.name === item.name);
      if (itemIndex >= 0) {
        // Remove from favorites
        const newFavorites = [...prevFavorites];
        newFavorites.splice(itemIndex, 1);
        return newFavorites;
      } else {
        // Add to favorites
        return [...prevFavorites, item];
      }
    });
  };

  const isFavorite = (name) => {
    return favorites.some((item) => item.name === name);
  };

  const favoritesContextValue = {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={favoritesContextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
