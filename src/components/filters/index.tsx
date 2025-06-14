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
import { useReducer, useState } from "react";
import {
  decodeAttributes,
  decodeTags,
  encodeAttributes,
  encodeTags,
  getNumberFromParams,
} from "@/lib/utils/params";
import { type getCategories } from "@/server/queries/categories";
import { useUpdateParams } from "@/hooks/use-update-params";
import { filterReducer } from "./filter-reducer";
import { type getTags } from "@/server/queries/tags";
import { Filter } from "lucide-react";
import AttributeFilters from "./attributes";
import CategoryFilter from "./categories";
import PriceSlider from "./price";
import Tags from "./tags";

interface Props {
  categories: Awaited<ReturnType<typeof getCategories>>;
  tags: Awaited<ReturnType<typeof getTags>>;
}

export default function FiltersDialog({ categories, tags }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants()}>
        <Filter /> Filters
      </DialogTrigger>

      <DialogContent className="py-0 sm:max-w-xl">
        <div className="relative h-full pt-6">
          <DialogHeader>
            <DialogTitle>Filters</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Wrapper>
            <Filters categories={categories} tags={tags} setOpen={setOpen} />
          </Wrapper>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  const { params } = useUpdateParams();

  return <div key={params.toString()}>{children}</div>;
}

function Filters({
  categories,
  tags,
  setOpen,
}: Props & { setOpen: (b: boolean) => void }) {
  const { params, updateParams } = useUpdateParams();

  const [state, dispatch] = useReducer(filterReducer, {
    category: params.get("category") ?? undefined,
    min_price: getNumberFromParams("min_price", params),
    max_price: getNumberFromParams("max_price", params),
    attributes: decodeAttributes(params),
    tags: decodeTags(params),
  });

  function handleSubmit() {
    if (state.attributes.length > 0) {
      encodeAttributes(state.attributes, params);
    } else {
      params.delete("attributes");
    }

    if (state.tags.length > 0) {
      encodeTags(state.tags, params);
    } else {
      params.delete("tags");
    }

    if (state.category) {
      params.set("category", state.category);
    } else {
      params.delete("category");
    }

    if (state.min_price) {
      params.set("min_price", String(state.min_price));
    } else {
      params.delete("min_price");
    }

    if (state.max_price) {
      params.set("max_price", String(state.max_price));
    } else {
      params.delete("max_price");
    }

    params.delete("page");
    updateParams(params);
    setOpen(false);
  }

  return (
    <div className="grid gap-6">
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

      <Tags dispatch={dispatch} tags={tags} selectedTags={state.tags} />

      {state.category && (
        <AttributeFilters
          dispatch={dispatch}
          selectedAttributes={state.attributes}
          attributes={
            categories.find((c) => c.slug === state.category)
              ?.categoryAttributes ?? []
          }
        />
      )}

      <DialogFooter className="bg-background sticky bottom-0 -mt-4 py-4">
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
