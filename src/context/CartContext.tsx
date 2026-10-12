'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItemType } from '@/types';
import { trackEvent } from '@/actions/analytics';
import { getClientSessionId, detectTrafficSource } from '@/lib/session';

interface CartContextType {
  cartItems: CartItemType[];
  addToCart: (item: CartItemType) => void;
  updateQuantity: (index: number, delta: number) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  cartSubtotal: number;
  currency: 'EGP' | 'USD';
  toggleCurrency: () => void;
  usdRate: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState<'EGP' | 'USD'>('EGP');
  const usdRate = 49.5;

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('salem_cart');
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch {}
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('salem_cart', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  const addToCart = (item: CartItemType) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.productId === item.productId && i.variantId === item.variantId
      );
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].quantity += item.quantity;
        return copy;
      }
      return [...prev, item];
    });

    const sid = getClientSessionId();
    const source = detectTrafficSource();
    if (sid) {
      trackEvent({
        eventType: 'ADD_TO_CART',
        productId: item.productId,
        productTitle: item.title,
        sessionId: sid,
        trafficSource: source,
        metadata: {
          price: item.price,
          variant: item.selectedColor,
          condition: item.condition,
        },
      }).catch(() => {});
    }

    setIsCartOpen(true);
  };

  const updateQuantity = (index: number, delta: number) => {
    setCartItems((prev) => {
      const copy = [...prev];
      if (copy[index]) {
        copy[index].quantity += delta;
        if (copy[index].quantity <= 0) {
          copy.splice(index, 1);
        }
      }
      return copy;
    });
  };

  const removeItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'EGP' ? 'USD' : 'EGP'));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartSubtotal,
        currency,
        toggleCurrency,
        usdRate,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
