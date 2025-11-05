
"use client";

import { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar itens do localStorage ao iniciar
  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualiza o localStorage sempre que o carrinho mudar
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, loading]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((i) => i.name === item.name);
      if (itemIndex >= 0) {
        const newItems = [...prevItems];
        newItems[itemIndex].quantity += 1;
        return newItems;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (name) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== name));
  };

  const updateQuantity = (name, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.name === name) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const cartContextValue = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
