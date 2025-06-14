"use client";

import type { discoverProducts } from "@/server/queries/products";
import { useGridContext } from "./grid-context";
import { formatPrice } from "@/lib/utils/price";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Awaited<ReturnType<typeof discoverProducts>>["products"][number];
}

export default function ProductCard({ product }: Props) {
  const { showDescriptiveGrid } = useGridContext();

  if (showDescriptiveGrid) {
    return (
      <li className="relative flex gap-4 lg:gap-8">
        <div className="relative mb-2 aspect-[3/4] w-32 shrink-0 sm:w-52 lg:w-72">
          <Image
            src={product.poster}
            alt=""
            fill
            sizes="33vw"
            className="rounded"
          />
        </div>
        <div>
          <h3 className="mb-2 text-lg font-bold sm:text-xl">
            <Link
              href={`/product/${product.slug}`}
              className="after:absolute after:inset-0"
              prefetch={false}
            >
              {product.name}
            </Link>
          </h3>

          <p className="mb-3 font-semibold">{formatPrice(product.price)}</p>

          <p className="text-foreground-muted mb-6 hidden text-sm sm:block lg:text-lg">
            {product.description}
          </p>

          <ul className="flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <li
                key={t.id}
                className="bg-primary text-primary-foreground rounded px-2 py-1 text-xs font-semibold sm:px-3 sm:py-1.5 sm:text-sm"
              >
                {t.name}
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  }

  return (
    <li className="relative">
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
  );
}

export function ProductCardSkeleton({
  showDescriptiveGrid,
}: {
  showDescriptiveGrid: boolean;
}) {
  if (showDescriptiveGrid) {
    return (
      <li className="relative flex gap-4 lg:gap-8">
        <div className="relative mb-2 aspect-[3/4] w-32 shrink-0 sm:w-52 lg:w-72">
          <Skeleton className="h-full w-full rounded" />
        </div>
        <div className="flex flex-1 flex-col">
          <Skeleton className="mb-2 h-6 w-3/4 sm:h-8" />
          <Skeleton className="mb-3 h-5 w-24" />
          <Skeleton className="mb-7 hidden h-4 w-full sm:block lg:h-12" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-16 rounded" />
            <Skeleton className="h-8 w-12 rounded" />
            <Skeleton className="hidden h-8 w-20 rounded sm:block" />
          </div>
        </div>
      </li>
    );
  }

  return (
    <li>
      <Skeleton className="relative mb-2 aspect-[3/4]" />
      <Skeleton className="mb-1 h-4 sm:mb-1.5" />
      <Skeleton className="h-3 w-20 pb-1 sm:h-4" />
    </li>
  );
}
