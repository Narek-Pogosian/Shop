"use client";

import { PreviewCartItem } from "@/components/cart/cart-item";
import { useCartContext } from "@/components/cart/cart-context";
import { ShoppingCart } from "lucide-react";
import { CartPrice } from "@/components/cart";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CheckoutCard() {
  const { cart } = useCartContext();

  if (cart.length === 0) {
    return (
      <div className="py-10 text-center">
        <div className="bg-primary/5 mx-auto mb-4 flex size-28 items-center justify-center rounded-full">
          <ShoppingCart className="text-primary size-14" />
        </div>
        <h1 className="mb-6 text-xl font-semibold">Your cart is empty</h1>
        <Button asChild>
          <Link href="/">Go to shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="-mt-4 mb-4">
        {cart.map((item) => (
          <PreviewCartItem key={item.id} item={item} />
        ))}
      </div>

      <CartPrice items={cart} />

      <Button>Place order</Button>
    </>
  );
}
