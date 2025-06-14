import ProductList, {
  ProductsSkeleton,
} from "@/components/products/product-list";
import { GridContextProvider } from "@/components/products/grid-context";
import { productQueryParams } from "@/lib/schemas/product-schemas";
import { getCategories } from "@/server/queries/categories";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getTags } from "@/server/queries/tags";
import { cookies } from "next/headers";
import DesktopCategories from "@/components/filters/desktop-categories";
import FiltersDialog from "@/components/filters";
import GridToggle from "@/components/products/grid-toggle";
import Sorting from "@/components/products/sorting";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [search, categories, tags, cookieStore] = await Promise.all([
    searchParams,
    getCategories(),
    getTags(),
    cookies(),
  ]);

  const { data, success } = productQueryParams.safeParse(search);

  if (!success) {
    // TODO: Remove incorrect keys instead of redirecting
    return redirect("/");
  }

  const showDescriptiveGrid =
    cookieStore.get("descriptive-grid")?.value === "true";

  return (
    <GridContextProvider defaultValue={showDescriptiveGrid}>
      <div className="mb-8 flex items-center justify-between">
        <div className="[&_button]:border-input-border flex items-center gap-4 [&_button]:rounded-full">
          <FiltersDialog categories={categories} tags={tags} />
          <DesktopCategories
            categories={categories}
            currentCategory={data.category}
          />
        </div>

        <div className="flex items-center gap-4">
          <GridToggle />
          <Sorting />
        </div>
      </div>

      <Suspense
        key={Object.values(data).join("")}
        fallback={
          <ProductsSkeleton showDescriptiveGrid={showDescriptiveGrid} />
        }
      >
        <ProductList searchParams={data} />
      </Suspense>
    </GridContextProvider>
  );
}
