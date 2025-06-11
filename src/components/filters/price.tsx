import type { FilterDispatch } from "./filter-reducer";
import { formatPrice } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

const MIN_PRICE = 0;
const MAX_PRICE = 130;

interface Props {
  dispatch: FilterDispatch;
  min_price?: number;
  max_price?: number;
}

function PriceSlider({ dispatch, min_price, max_price }: Props) {
  return (
    <div className="price-slider">
      <h3 className="text-foreground-muted mb-1 text-xs font-semibold tracking-wider uppercase">
        Price Range
      </h3>

      <div className="mb-2 flex justify-between text-sm font-medium">
        <span>
          {formatPrice(min_price ?? MIN_PRICE, { showZeroAsNumber: true })}
        </span>
        <span>
          {formatPrice(max_price ?? MAX_PRICE, { showZeroAsNumber: true })}
        </span>
      </div>

      <Slider
        aria-label="Price range"
        min={MIN_PRICE}
        max={MAX_PRICE}
        step={10}
        value={[min_price ?? MIN_PRICE, max_price ?? MAX_PRICE]}
        onValueChange={([newMin, newMax]) => {
          dispatch({ type: "EDIT_MIN_PRICE", payload: newMin });

          if (newMax && newMax < MAX_PRICE) {
            dispatch({ type: "EDIT_MAX_PRICE", payload: newMax });
          } else {
            dispatch({ type: "EDIT_MAX_PRICE", payload: undefined });
          }
        }}
      />
    </div>
  );
}

export default PriceSlider;
