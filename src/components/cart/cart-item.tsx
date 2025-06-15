import type { CartItemType } from "./cart-reducer";
import { useCartContext } from "./cart-context";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { dispatch } = useCartContext();

  return (
    <div className="flex gap-4 border-b py-5">
      <Image
        src={item.image}
        alt=""
        width={60}
        height={95}
        className="rounded"
      />
      <div className="flex grow justify-between">
        <div>
          <Link
            className="text-sm font-semibold underline-offset-2 hover:underline"
            href={`/product/${item.slug}`}
          >
            {item.name}
          </Link>
          <p className="text-foreground-muted mb-2 text-sm">
            {Object.entries(item.attributes).map(([key, value]) => (
              <span key={key} className="text-foreground-muted mr-2 text-sm">
                <span>{key}:</span> {value}
              </span>
            ))}
          </p>

          <QuantityChange itemId={item.id} initialQuantity={item.quantity} />
        </div>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
          className="h-fit"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

function QuantityChange({
  itemId,
  initialQuantity,
}: {
  itemId: string;
  initialQuantity: number;
}) {
  const { dispatch } = useCartContext();
  const [quantity, setQuantity] = useState(initialQuantity);

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    setQuantity(value > 100 ? 100 : value < 1 ? 1 : value);

    if (!isNaN(value)) {
      dispatch({
        type: "SET_QUANTITY",
        payload: { id: itemId, quantity: value },
      });
    }
  }

  return (
    <label className="flex items-center gap-1">
      <span className="text-foreground-muted text-sm">Quantity:</span>
      <input
        type="number"
        min={1}
        max={100}
        value={quantity || ""}
        onChange={handleQuantityChange}
        className="w-16 rounded border py-1 pr-0.5 pl-2 text-sm"
      />
    </label>
  );
}

export function PreviewCartItem({ item }: CartItemProps) {
  return (
    <div className="flex gap-4 border-b py-4">
      <Image
        src={item.image}
        alt=""
        width={75}
        height={100}
        className="rounded"
      />
      <div className="grow">
        <h3 className="text-sm font-semibold">{item.name}</h3>
        <p className="text-foreground-muted mb-2 text-sm">
          {Object.entries(item.attributes).map(([key, value]) => (
            <span key={key} className="text-foreground-muted mr-2 text-sm">
              <span>{key}:</span> {value}
            </span>
          ))}
        </p>
        <span className="text-foreground-muted mr-1 text-sm">
          Quantity: {item.quantity}
        </span>
      </div>
    </div>
  );
}
