"use client";

import { type getProductBySlug } from "@/server/queries/products";
import { cn, shallowEquals } from "@/lib/utils";
import { useCartContext } from "./cart-context";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  product: NonNullable<Awaited<ReturnType<typeof getProductBySlug>>>;
};

type SelectedAttributes = Record<string, string>;

function AddToCart({ product }: Props) {
  const { cart, dispatch } = useCartContext();

  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] =
    useState<SelectedAttributes>(
      product.productAttributes.reduce((acc, { name }) => {
        acc[name] = "";
        return acc;
      }, {} as SelectedAttributes),
    );

  function handleAdd() {
    const alreadyInCart = cart.find(
      (item) =>
        shallowEquals(item.attributes, selectedAttributes) &&
        item.name === product.name,
    );

    if (alreadyInCart) {
      dispatch({
        type: "SET_QUANTITY",
        payload: { id: alreadyInCart.id, quantity: alreadyInCart.quantity + 1 },
      });
    } else {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: crypto.randomUUID(),
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.poster,
          attributes: selectedAttributes,
          quantity: quantity,
        },
      });
    }

    setQuantity(1);
    setSelectedAttributes((prev) => {
      const resetAttributes = { ...prev };
      Object.keys(resetAttributes).forEach((key) => {
        resetAttributes[key] = "";
      });

      return resetAttributes;
    });
  }

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    setQuantity(value > 100 ? 100 : value < 1 ? 1 : value);
  }

  const isValid = product.productAttributes.every(
    (attribute) => selectedAttributes[attribute.name],
  );

  return (
    <div>
      <div className="mb-6 space-y-4">
        {product?.productAttributes.map((attribute) => (
          <div key={attribute.id}>
            <h3 className="text-foreground-muted mb-1 text-xs tracking-wider uppercase">
              {attribute.name}
            </h3>
            <div className="flex flex-wrap gap-2" role="group">
              {attribute.values.map((value) => (
                <Button
                  key={value}
                  size="sm"
                  variant="outline"
                  aria-pressed={selectedAttributes[attribute.name] === value}
                  aria-label={`Select ${value} for ${attribute.name}`}
                  className={cn("text-xs md:text-sm", {
                    "bg-primary! text-primary-foreground!":
                      selectedAttributes[attribute.name] === value,
                  })}
                  onClick={() =>
                    void setSelectedAttributes((prev) => ({
                      ...prev,
                      [attribute.name]: value,
                    }))
                  }
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row-reverse justify-end gap-4">
        <Input
          id="quantity"
          type="number"
          min={1}
          max={100}
          value={quantity || ""}
          onChange={handleQuantityChange}
          aria-label="Select quantity"
          className="bg-background w-24"
        />
        <Button
          disabled={!isValid}
          onClick={handleAdd}
          aria-label={`Add ${quantity} items to cart with selected attributes`}
          className="w-28"
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default AddToCart;
