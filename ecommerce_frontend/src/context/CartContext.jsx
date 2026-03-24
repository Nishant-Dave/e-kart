import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCart } from '../services/cart';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  /**
   * Loads the latest cart state from the API
   */
  const fetchCart = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token') || localStorage.getItem('token');
      if (!token) {
        setCartItems([]);
        setTotalCount(0);
        return;
      }
      
      const data = await getCart();
      if (data && data.items) {
        setCartItems(data.items);
        const count = data.items.reduce((acc, item) => acc + item.quantity, 0);
        setTotalCount(count);
      } else {
        setCartItems([]);
        setTotalCount(0);
      }
    } catch (err) {
      console.error('Failed to load global cart:', err);
    }
  }, []);

  /**
   * Refreshes the global state manually (alias for fetchCart per requirements)
   */
  const updateCartState = () => {
    fetchCart();
  };

  // Automatically fetch cart data when the provider mounts
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <CartContext.Provider value={{ cartItems, totalCount, fetchCart, updateCartState }}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * Custom hook to safely consume the CartContext in any component
 */
export const useCart = () => useContext(CartContext);
