import { Button } from "@/components/ui/button";
import { getCategories } from "@/server/queries/categories";
import CategoryActions from "./_components/category-actions";
import Image from "next/image";
import Link from "next/link";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="h-fit">Categories</h1>
        <Button asChild>
          <Link href="/admin/categories/create">Create category</Link>
        </Button>
      </div>

      <ul className="space-y-6">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex items-center justify-between gap-2 [&:not(:last-of-type)]:border-b [&:not(:last-of-type)]:pb-6"
          >
            <div className="flex items-center gap-6">
              {/* <Image
                src={category.image}
                alt=""
                width={80}
                height={80}
                className="rounded"
              /> */}
              <div>
                <h3 className="mb-1 font-semibold">{category.name}</h3>
                <p className="text-foreground-muted mb-2 text-xs">
                  Created: {new Date(category.createdAt).toDateString()}
                </p>
                <p className="text-foreground-muted text-sm font-medium">
                  {category._count.products} products
                </p>
                <p></p>
              </div>
            </div>
            <CategoryActions categoryId={category.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
