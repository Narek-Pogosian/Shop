import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import type { FilterDispatch } from "./filter-reducer";
import type { getTags } from "@/server/queries/tags";

interface Props {
  selectedTags: number[];
  tags: Awaited<ReturnType<typeof getTags>>;
  dispatch: FilterDispatch;
}

export default function Tags({ selectedTags, tags, dispatch }: Props) {
  function isValueIncluded(id: number) {
    return Boolean(selectedTags.includes(id));
  }

  function handleSelect(id: number) {
    if (isValueIncluded(id)) {
      dispatch({ type: "REMOVE_TAG", payload: id });
    } else {
      dispatch({ type: "ADD_TAG", payload: id });
    }
  }

  return (
    <div>
      <h3 className="text-foreground-muted mb-1 text-xs font-semibold tracking-wider uppercase">
        Tags
      </h3>

      <div role="group" className="flex flex-wrap gap-1">
        {tags.map((value) => {
          const includes = isValueIncluded(value.id);

          return (
            <Button
              key={value.id}
              size="sm"
              variant="secondary"
              aria-pressed={includes}
              onClick={() => handleSelect(value.id)}
              className={cn("text-xs md:text-sm", {
                "bg-primary! text-primary-foreground! shadow-btn-primary":
                  includes,
              })}
            >
              {value.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
