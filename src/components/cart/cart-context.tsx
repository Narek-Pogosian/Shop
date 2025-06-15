"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import {
  cartReducer,
  type CartDispatch,
  type CartItem,
  type CartState,
} from "./cart-reducer";

interface CartContextType {
  cart: CartItem[];
  dispatch: CartDispatch;
}

const CartContext = createContext<CartContextType | null>(null);

const init = (): CartState => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        return { cart: JSON.parse(storedCart) as CartItem[] };
      } catch (e) {
        console.error("Error parsing cart from localStorage", e);
      }
    }
  }
  return { cart: [] };
};

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, init);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw Error("useCartContext can only be used inside CartContextProvider");
  }

  return context;
}
