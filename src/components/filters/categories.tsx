import type { Category } from "@prisma/client";
import type { FilterDispatch } from "./filter-reducer";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface Props {
  dispatch: FilterDispatch;
  categories: Category[];
  category?: string;
}

export default function CategoryFilter({
  category,
  categories,
  dispatch,
}: Props) {
  function handleCategoryChange(category?: string) {
    dispatch({ type: "EDIT_CATEGORY", payload: category });
  }

  return (
    <div>
      <h3
        id="categories"
        className="text-foreground-muted mb-2 border-b pb-2 text-xs font-semibold tracking-wider uppercase"
      >
        Category
      </h3>
      <div className="flex gap-2 max-lg:hidden">
        <Button
          variant="outline"
          className={cn({ "bg-primary! text-primary-foreground!": !category })}
          aria-pressed={!category}
          onClick={() => handleCategoryChange(undefined)}
        >
          All
        </Button>
        {categories.map((c) => (
          <Button
            key={c.id}
            variant="outline"
            className={cn({
              "bg-primary! text-primary-foreground!": category == c.slug,
            })}
            aria-pressed={category == c.slug}
            onClick={() => handleCategoryChange(c.slug)}
          >
            {c.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
