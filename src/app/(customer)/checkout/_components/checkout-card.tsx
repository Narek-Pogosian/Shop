"use client";

import { type CreateOrderType } from "@/schemas/checkout-schemas";
import { type GetCartType } from "@/app/api/cart/route";
import { PreviewCartItem } from "../../_components/cart/cart-item";
import { useMutation } from "@tanstack/react-query";
import { useGetCart } from "@/hooks/use-get-cart";
import { CartPrice } from "../../_components/cart";
import { Loader2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CheckoutCard() {
  const { data, isError, isLoading } = useGetCart();

  if (isLoading) {
    return (
      <div className="flex h-44 items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return <div className="h-44 content-center text-center">Error</div>;
  }

  if (data.items.length === 0) {
    return (
      <div className="py-10 text-center">
        <div className="mx-auto mb-4 flex size-28 items-center justify-center rounded-full bg-primary/5">
          <ShoppingCart className="size-14 text-primary" />
        </div>
        <h1 className="mb-6 text-xl font-semibold">Your cart is empty</h1>
        <Button asChild>
          <Link href="/">Go to shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="-mt-4">
        {data.items.map((item) => (
          <PreviewCartItem key={item.id} item={item} />
        ))}
      </div>
      <CartPrice items={data.items} />
      <PlaceOrder items={data.items} />
    </div>
  );
}

function PlaceOrder({ items }: { items: GetCartType["items"] }) {
  const { mutate, isPending } = useMutation({
    mutationFn: (vals: CreateOrderType) =>
      fetch("/api/order", { method: "POST", body: JSON.stringify(vals) }).then(
        (res) => res.json(),
      ),
  });

  function handleClick() {
    if (isPending) return;

    const mappedItems = items.map((item) => ({
      quantity: item.quantity,
      productId: item.productId,
      attributes: item.productAttributes,
      cartId: item.cartId,
    }));

    mutate(mappedItems, {
      onSuccess: () => {
        location.replace("/");
      },
    });
  }

  return (
    <Button onClick={handleClick} disabled={isPending}>
      {isPending ? "Proccessing" : "Place order"}
    </Button>
  );
}
