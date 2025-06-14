import { getProductBySlug } from "@/server/queries/products";
import { formatPrice } from "@/lib/utils/price";
import { Luggage } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type Params = Promise<{ slug: string }>;

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product)
    return (
      <div className="pt-20 text-center">
        <div className="bg-primary/5 mx-auto mb-4 flex size-28 items-center justify-center rounded-full">
          <Luggage className="text-primary size-14" />
        </div>
        <h1 className="mb-4 text-xl font-semibold">Product not found</h1>
        <Button size="lg" asChild>
          <Link href="/">Back to shop</Link>
        </Button>
      </div>
    );

  return (
    <>
      <section
        className="mb-12 flex w-full flex-col gap-8 sm:flex-row xl:gap-16"
        aria-describedby="title"
      >
        <div className="relative aspect-[9/11] h-fit w-full shrink-0 sm:w-72 lg:w-96 xl:w-[500px]">
          <Image
            src={product.poster}
            alt=""
            fill
            sizes="33vw"
            className="rounded"
          />

          <MobileInfo
            name={product.name}
            description={product.description}
            price={product.price}
          />
        </div>

        <div className="w-full">
          <DesktopInfo
            name={product.name}
            description={product.description}
            price={product.price}
          />

          <p>TODO: Add to cart</p>
        </div>
      </section>
    </>
  );
}

interface InfoProps {
  description: string;
  price: number;
  name: string;
}

function DesktopInfo({ name, description, price }: InfoProps) {
  return (
    <div className="max-sm:hidden">
      <h1 className="mb-2 text-2xl font-bold">{name}</h1>

      <p className="text-foreground-muted font-semibold">
        {formatPrice(price)}
      </p>

      <hr className="my-8" />
      <p className="text-foreground-muted max-w-xl">{description}</p>
      <hr className="my-8" />
    </div>
  );
}

function MobileInfo({ name, description, price }: InfoProps) {
  return (
    <div className="absolute inset-0 rounded bg-black/60 p-8 text-white sm:hidden">
      <h1 id="title" className="mb-1 text-xl font-bold">
        {name}
      </h1>

      <p className="mb-4 font-semibold">{formatPrice(price)}</p>
      <p className="max-w-lg">{description}</p>
    </div>
  );
}
