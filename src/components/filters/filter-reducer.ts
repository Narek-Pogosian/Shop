import type { ActionDispatch } from "react";

type State = {
  category?: string;
  min_rating?: number;
  min_price?: number;
  max_price?: number;
};

type Action =
  | { type: "EDIT_CATEGORY"; payload?: string }
  | { type: "EDIT_MIN_RATING"; payload?: number }
  | { type: "EDIT_MIN_PRICE"; payload?: number }
  | { type: "EDIT_MAX_PRICE"; payload?: number }
  | { type: "RESET" };

export type FilterDispatch = ActionDispatch<[action: Action]>;

export function filterReducer(state: State, action: Action): State {
  switch (action.type) {
    case "EDIT_CATEGORY":
      return { ...state, category: action.payload };

    case "EDIT_MIN_RATING":
      return { ...state, min_rating: action.payload };

    case "EDIT_MIN_PRICE":
      return { ...state, min_price: action.payload };

    case "EDIT_MAX_PRICE":
      return { ...state, max_price: action.payload };

    case "RESET":
      return {};

    default:
      return state;
  }
}
