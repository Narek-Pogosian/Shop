import type { CategoryAttribute } from "@prisma/client";
import type { FilterDispatch } from "./filter-reducer";
import type { Attribute } from "@/lib/schemas/product-schemas";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface Props {
  selectedAttributes: Attribute[];
  attributes: CategoryAttribute[];
  dispatch: FilterDispatch;
}

export default function AttributeFilters({
  attributes,
  selectedAttributes,
  dispatch,
}: Props) {
  function isValueIncluded(name: string, value: string) {
    return Boolean(
      selectedAttributes.find((a) => a.name === name)?.values.includes(value),
    );
  }

  function handleSelect(name: string, value: string) {
    if (isValueIncluded(name, value)) {
      dispatch({ type: "REMOVE_ATTRIBUTE", payload: { name, value } });
    } else {
      dispatch({ type: "ADD_ATTRIBUTE", payload: { name, value } });
    }
  }

  return (
    <div>
      <h3 className="text-foreground-muted mb-1 text-xs font-semibold tracking-wider uppercase">
        Attributes
      </h3>

      {attributes.map((attribute) => (
        <div key={attribute.id} className="mb-4">
          <h4
            id={attribute.name}
            className="text-foreground-muted mb-1 text-xs tracking-wider"
          >
            {attribute.name}
          </h4>
          <div
            role="group"
            className="flex flex-wrap gap-1"
            aria-labelledby={attribute.name}
          >
            {attribute.values.map((value) => {
              const includes = isValueIncluded(attribute.name, value);

              return (
                <Button
                  key={value}
                  size="sm"
                  variant="outline"
                  aria-label={`Filter by ${attribute.name}: ${value}`}
                  aria-pressed={includes}
                  onClick={() => handleSelect(attribute.name, value)}
                  className={cn("text-xs md:text-sm", {
                    "bg-primary! text-primary-foreground!": includes,
                  })}
                >
                  {value}
                </Button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
