import ProductList, {
  ProductsSkeleton,
} from "@/components/products/product-list";
import Sorting from "@/components/products/sorting";
import { productQueryParams } from "@/lib/schemas/product-schemas";
import { Filter, Grid3X3 } from "lucide-react";
import { getCategories } from "@/server/queries/categories";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";

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

  const categories = await getCategories();

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4 [&_button]:rounded-full">
          <Button>
            <Filter /> Filters
          </Button>
          <ul className="flex gap-1 max-lg:hidden">
            <Button variant="outline">All</Button>
            {categories.map((c) => (
              <Button variant="outline" key={c.id}>
                {c.name}
              </Button>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Grid3X3 />
          </Button>
          <Sorting />
        </div>
      </div>

      <Suspense
        key={Object.values(data).join("")}
        fallback={<ProductsSkeleton />}
      >
        <ProductList searchParams={data} />
      </Suspense>
    </>
  );
}
