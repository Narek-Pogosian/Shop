"use client";

import { useUpdateParams } from "@/hooks/use-update-params";
import type { Category } from "@prisma/client";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function DesktopCategories({
  categories,
  currentCategory,
}: {
  categories: Category[];
  currentCategory?: string;
}) {
  const { params, updateParams } = useUpdateParams();

  function handleCategoryChange(category?: string) {
    if (!category) {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    params.delete("attributes");
    params.delete("page");
    updateParams(params);
  }

  return (
    <div className="flex gap-1 max-lg:hidden">
      <Button
        variant="secondary"
        className={cn({
          "bg-secondary-hover!": !currentCategory,
        })}
        aria-pressed={!currentCategory}
        onClick={() => handleCategoryChange(undefined)}
      >
        All
      </Button>

      {categories.map((c) => (
        <Button
          key={c.id}
          variant="secondary"
          className={cn({
            "bg-secondary-hover!": currentCategory == c.slug,
          })}
          aria-pressed={currentCategory == c.slug}
          onClick={() => handleCategoryChange(c.slug)}
        >
          {c.name}
        </Button>
      ))}
    </div>
  );
}
