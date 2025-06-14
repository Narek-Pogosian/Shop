import { type ProductQueryParamsType } from "@/lib/schemas/product-schemas";
import { discoverProducts } from "@/server/queries/products";
import { Luggage } from "lucide-react";
import ProductCard, { ProductCardSkeleton } from "./product-card";
import ProductPagination from "./pagination";
import ProductGrid from "./product-grid";

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
      <ProductGrid>
        {res.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>

      {res.totalPages > 1 && (
        <ProductPagination
          currentPage={res.currentPage}
          totalPages={res.totalPages}
        />
      )}
    </section>
  );
}

export function ProductsSkeleton({
  showDescriptiveGrid,
}: {
  showDescriptiveGrid: boolean;
}) {
  return (
    <ProductGrid>
      {new Array(12).fill(0).map((_, i) => (
        <ProductCardSkeleton
          key={i}
          showDescriptiveGrid={showDescriptiveGrid}
        />
      ))}
    </ProductGrid>
  );
}
