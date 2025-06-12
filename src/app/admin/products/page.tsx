import { getProducts } from "@/server/queries/products";
import { formatPrice } from "@/lib/utils/price";
import { Button } from "@/components/ui/button";
import ProductActions from "./_components/product-actions";
import PageTitle from "../_components/page-title";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <>
      <div className="flex justify-between">
        <PageTitle>Products</PageTitle>
        <Button className="h-fit" asChild>
          <Link href="/admin/products/create">Create product</Link>
        </Button>
      </div>

      <hr role="presentation" className="mb-8" />

      <ul className="space-y-6">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex items-center justify-between gap-2 [&:not(:last-of-type)]:border-b [&:not(:last-of-type)]:pb-6"
          >
            <div className="flex items-center gap-6">
              {/* <Image
                src={product.poster}
                alt={`Image of ${product.name}`}
                width={80}
                height={102}
                className="rounded"
              /> */}
              <div>
                <h3 className="mb-1 font-semibold">{product.name}</h3>
                <p className="text-foreground-muted mb-2 text-xs">
                  Created: {new Date(product.createdAt).toDateString()}
                </p>
                <p className="text-foreground-muted text-xs">
                  {formatPrice(Number(product.price))}
                </p>
              </div>
            </div>
            <ProductActions productId={product.id} />
          </li>
        ))}
      </ul>
    </>
  );
}
