import type { Attribute } from "@/lib/schemas/product-schemas";
import type { ActionDispatch } from "react";

export type FilterState = {
  category?: string;
  min_rating?: number;
  min_price?: number;
  max_price?: number;
  attributes: Attribute[];
  tags: number[];
};

type Action =
  | { type: "SET_CATEGORY"; payload?: string }
  | { type: "SET_MIN_RATING"; payload?: number }
  | { type: "SET_MIN_PRICE"; payload?: number }
  | { type: "SET_MAX_PRICE"; payload?: number }
  | { type: "ADD_ATTRIBUTE"; payload: { name: string; value: string } }
  | { type: "REMOVE_ATTRIBUTE"; payload: { name: string; value: string } }
  | { type: "ADD_TAG"; payload: number }
  | { type: "REMOVE_TAG"; payload: number }
  | { type: "SET_STATE"; payload: FilterState };

export type FilterDispatch = ActionDispatch<[action: Action]>;

export function filterReducer(state: FilterState, action: Action): FilterState {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload };

    case "SET_MIN_RATING":
      return { ...state, min_rating: action.payload };

    case "SET_MIN_PRICE":
      return { ...state, min_price: action.payload };

    case "SET_MAX_PRICE":
      return { ...state, max_price: action.payload };

    case "ADD_ATTRIBUTE": {
      const { name, value } = action.payload;

      const existingAttr = state.attributes.find((attr) => attr.name === name);
      if (existingAttr?.values.includes(value)) {
        return state;
      }

      // If attribute exists but value is new, add value
      if (existingAttr) {
        const updatedAttributes = state.attributes.map((attr) =>
          attr.name === name
            ? { ...attr, values: [...attr.values, value] }
            : attr,
        );
        return { ...state, attributes: updatedAttributes };
      }

      // If attribute doesn't exist, add new attribute
      return {
        ...state,
        attributes: [...state.attributes, { name, values: [value] }],
      };
    }

    case "REMOVE_ATTRIBUTE": {
      const { name, value } = action.payload;

      const existingAttr = state.attributes.find((attr) => attr.name === name);
      if (!existingAttr) {
        return state;
      }

      const filteredValues = existingAttr.values.filter((v) => v !== value);
      if (filteredValues.length === existingAttr.values.length) {
        // Value was not found; nothing to remove
        return state;
      }

      if (filteredValues.length === 0) {
        // Remove the whole attribute if no values left
        const updatedAttributes = state.attributes.filter(
          (attr) => attr.name !== name,
        );
        return { ...state, attributes: updatedAttributes };
      }

      // Update attribute with remaining values
      const updatedAttributes = state.attributes.map((attr) =>
        attr.name === name ? { ...attr, values: filteredValues } : attr,
      );

      return { ...state, attributes: updatedAttributes };
    }

    case "ADD_TAG":
      return { ...state, tags: [...state.tags, action.payload] };

    case "REMOVE_TAG":
      return { ...state, tags: state.tags.filter((t) => t !== action.payload) };

    case "SET_STATE":
      return action.payload;

    default:
      return state;
  }
}
