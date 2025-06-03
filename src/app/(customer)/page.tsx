import { Suspense } from "react";
import ProductList from "./_components/product-list";

export default async function ShopPage() {
  return (
    <>
      <Suspense>
        <ProductList />
      </Suspense>
    </>
  );
}
