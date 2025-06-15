import type { ActionDispatch } from "react";

export type CartItemType = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  attributes: Record<string, string>;
};

export type CartState = {
  cart: CartItemType[];
};

type Action =
  | { type: "SET_CART"; payload: CartItemType[] }
  | { type: "ADD_ITEM"; payload: CartItemType }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "SET_QUANTITY"; payload: { id: string; quantity: number } };

export type CartDispatch = ActionDispatch<[action: Action]>;

export function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "SET_CART":
      return { cart: action.payload };

    case "ADD_ITEM":
      return { cart: state.cart.concat(action.payload) };

    case "REMOVE_ITEM":
      return { cart: state.cart.filter((item) => item.id !== action.payload) };

    case "SET_QUANTITY":
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
