"use client";

import { type ProductQueryParamsType } from "@/lib/schemas/product-schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateParams } from "@/hooks/use-update-params";

type Option = {
  label: string;
  sort_by: ProductQueryParamsType["sort_by"] | null;
  dir: ProductQueryParamsType["dir"] | null;
};

const sortingOptions: Option[] = [
  {
    sort_by: "price",
    dir: "asc",
    label: "Lowest price",
  },
  {
    sort_by: "price",
    dir: "desc",
    label: "Highest price",
  },
  {
    sort_by: null,
    dir: null,
    label: "Latest",
  },
];

function Sorting() {
  const { params, updateParams } = useUpdateParams();

  function handleChange(val: string) {
    const option = sortingOptions.find((o) => o.label === val)!;

    params.delete("page");

    if (!option.sort_by || !option.dir) {
      params.delete("sort_by");
      params.delete("dir");
    } else {
      params.set("sort_by", option.sort_by);
      params.set("dir", option.dir);
    }

    updateParams(params);
  }

  return (
    <div className="flex items-center gap-4">
      <Select
        value={
          sortingOptions.find(
            (o) =>
              o.sort_by === params.get("sort_by") &&
              o.dir === params.get("dir"),
          )?.label ?? ""
        }
        onValueChange={handleChange}
      >
        <SelectTrigger
          className="bg-secondary w-40 px-4 py-2 font-semibold"
          aria-label="Sort by"
          id="sort-by"
        >
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          {sortingOptions.map((o) => (
            <SelectItem value={o.label} key={o.label}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default Sorting;
