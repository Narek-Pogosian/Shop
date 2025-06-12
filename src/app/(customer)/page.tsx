import ProductList, {
  ProductsSkeleton,
} from "@/components/products/product-list";
import { productQueryParams } from "@/lib/schemas/product-schemas";
import { getCategories } from "@/server/queries/categories";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DesktopCategories from "@/components/filters/desktop-categories";
import FiltersDialog from "@/components/filters";
import Sorting from "@/components/products/sorting";
import { getTags } from "@/server/queries/tags";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [search, categories, tags] = await Promise.all([
    searchParams,
    getCategories(),
    getTags(),
  ]);

  const { data, success } = productQueryParams.safeParse(search);

  if (!success) {
    // TODO: Remove incorrect keys instead of redirecting
    return redirect("/");
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div className="[&_button]:border-input-border flex items-center gap-4 [&_button]:rounded-full">
          <FiltersDialog categories={categories} tags={tags} />
          <DesktopCategories
            categories={categories}
            currentCategory={data.category}
          />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="border-input-border">
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
