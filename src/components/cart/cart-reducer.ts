import type { ActionDispatch } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  attributes: JSON;
};

export type CartState = {
  cart: CartItem[];
};

type Action =
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "EDIT_QUANTITY"; payload: { id: string; quantity: number } };

export type CartDispatch = ActionDispatch<[action: Action]>;

export function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "SET_CART":
      return { cart: action.payload };

    case "ADD_ITEM":
      return { cart: state.cart.concat(action.payload) };

    case "REMOVE_ITEM":
      return { cart: state.cart.filter((item) => item.id !== action.payload) };

    case "EDIT_QUANTITY":
      return {
        cart: state.cart.map((item) =>
          item.id !== action.payload.id
            ? item
            : { ...item, quantity: action.payload.quantity },
        ),
      };

    default:
      return state;
  }
}
