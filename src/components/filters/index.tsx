"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { getCategories } from "@/server/queries/categories";
import { useReducer, useState } from "react";
import { useUpdateParams } from "@/hooks/use-update-params";
import { filterReducer } from "./filter-reducer";
import { Filter } from "lucide-react";
import PriceSlider from "./price";
import CategoryFilter from "./categories";
import Rating from "./rating";

interface Props {
  categories: Awaited<ReturnType<typeof getCategories>>;
}

export default function FiltersDialog({ categories }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants()}>
        <Filter /> Filters
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Filters categories={categories} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

function Filters({
  categories,
  setOpen,
}: Props & { setOpen: (b: boolean) => void }) {
  const { params, updateParams } = useUpdateParams();

  const [state, dispatch] = useReducer(filterReducer, {
    category: params.get("category") ?? undefined,
    min_rating: Number(params.get("min_rating")) || undefined,
    min_price: Number(params.get("min_price")) || undefined,
    max_price: Number(params.get("max_price")) || undefined,
  });

  function handleSubmit() {
    Object.entries(state).map(([key, value]) => {
      if (value) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });

    params.delete("page");
    updateParams(params);
    setOpen(false);
  }

  return (
    <div className="grid gap-7">
      <CategoryFilter
        categories={categories}
        category={state.category}
        dispatch={dispatch}
      />

      <PriceSlider
        dispatch={dispatch}
        min_price={state.min_price}
        max_price={state.max_price}
      />

      <Rating rating={state.min_rating} dispatch={dispatch} />

      <DialogFooter className="mt-4">
        <Button size="sm" onClick={handleSubmit}>
          Save Filters
        </Button>
        <DialogClose asChild>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
}
