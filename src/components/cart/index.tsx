"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatPrice, getTotalPrice } from "@/lib/utils/price";
import { type CartItemType } from "./cart-reducer";
import { useCartContext } from "./cart-context";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { ShoppingCart } from "lucide-react";
import CartItem from "./cart-item";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Cart() {
  const params = useParams();
  const isMounted = useIsMounted();
  const [open, setOpen] = useState(false);

  const { cart } = useCartContext();

  useEffect(() => {
    setOpen(false);
  }, [params]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="relative">
          <span className="sr-only">Your cart</span>
          <ShoppingCart />
          {isMounted && cart.length > 0 && <CartBadge count={cart.length} />}
        </Button>
      </DialogTrigger>
      <DialogContent className="pt-6 pb-0 sm:max-w-xl">
        <div className="relative h-full">
          <DialogHeader>
            <DialogTitle>Cart</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <CartContent />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CartContent() {
  const { cart } = useCartContext();

  if (cart.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="bg-primary/5 mx-auto mb-4 flex size-28 items-center justify-center rounded-full">
          <ShoppingCart className="text-primary size-14" />
        </div>
        <h1 className="mb-2 text-xl font-semibold">Cart is empty</h1>
      </div>
    );
  }

  return (
    <>
      <ul>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>

      <div className="py-6 text-center">
        <CartPrice items={cart} />
        <Button className="w-full" asChild>
          <Link href="/checkout">Procceed to checkout</Link>
        </Button>
      </div>
    </>
  );
}

export function CartPrice({ items }: { items: CartItemType[] }) {
  return (
    <div className="mb-2 space-y-1">
      <div className="text-foreground-muted flex justify-between text-sm">
        <span>Subtotal</span>
        <span>{formatPrice(getTotalPrice(items))}</span>
      </div>
      <div className="text-foreground-muted flex justify-between text-sm">
        <span>Shipment</span>
        <span>{formatPrice(0)}</span>
      </div>
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>{formatPrice(getTotalPrice(items))}</span>
      </div>
    </div>
  );
}

const CartBadge = ({ count }: { count: number }) => (
  <span
    aria-hidden
    className="bg-primary text-primary-foreground pointer-events-none absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full text-xs font-semibold"
  >
    {count}
  </span>
);
