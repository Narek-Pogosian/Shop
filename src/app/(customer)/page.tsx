import ProductList from "@/components/products/product-list";
import { productQueryParams } from "@/lib/schemas/product-schemas";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const search = await searchParams;

  const { data, success } = productQueryParams.safeParse(search);

  if (!success) {
    return redirect("/");
  }

  return (
    <>
      <Suspense>
        <ProductList searchParams={data} />
      </Suspense>
    </>
  );
}
