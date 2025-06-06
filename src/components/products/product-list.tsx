import { type ProductQueryParamsType } from "@/lib/schemas/product-schemas";
import { discoverProducts } from "@/server/queries/products";
import { formatPrice } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Luggage } from "lucide-react";
import ProductPagination from "./pagination";
import Image from "next/image";
import Link from "next/link";

export default async function ProductList({
  searchParams,
}: {
  searchParams: ProductQueryParamsType;
}) {
  const res = await discoverProducts(searchParams);

  if (res.products.length === 0) {
    return (
      <div className="pt-20 text-center">
        <div className="bg-primary/5 mx-auto mb-4 flex size-28 items-center justify-center rounded-full">
          <Luggage className="text-primary size-14" />
        </div>
        <h1 className="mb-2 text-xl font-semibold">No products found</h1>
        <p className="text-foreground-muted">
          Your search did not match any products. <br /> Please try again.
        </p>
      </div>
    );
  }

  return (
    <section aria-label="products">
      <ul className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4">
        {res.products.map((product) => (
          <li key={product.id} className="relative">
            <div className="relative mb-2 aspect-[3/4]">
              <Image
                src={product.poster}
                alt=""
                fill
                sizes="33vw"
                className="rounded"
              />
            </div>
            <h3 className="text-sm font-semibold">
              <Link
                href={`/product/${product.slug}`}
                className="after:absolute after:inset-0"
                prefetch={false}
              >
                {product.name}
              </Link>
            </h3>
            <p className="text-foreground-muted text-xs sm:text-sm">
              {formatPrice(product.price)}
            </p>
          </li>
        ))}
      </ul>

      {res.totalPages > 1 && (
        <ProductPagination
          currentPage={res.currentPage}
          totalPages={res.totalPages}
        />
      )}
    </section>
  );
}

export function ProductsSkeleton() {
  return (
    <ul className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4">
      {new Array(10).fill(0).map((_, i) => (
        <li key={i}>
          <Skeleton className="relative mb-2 aspect-[3/4]" />
          <Skeleton className="mb-1 h-4 sm:mb-1.5" />
          <Skeleton className="h-3 w-20 pb-1 sm:h-4" />
        </li>
      ))}
    </ul>
  );
}
