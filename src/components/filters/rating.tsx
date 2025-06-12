import StarRating from "../ui/star-rating";
import type { FilterDispatch } from "./filter-reducer";

interface Props {
  dispatch: FilterDispatch;
  rating?: number;
}

export default function Rating({ rating, dispatch }: Props) {
  function handleChange(val: number) {
    dispatch({ type: "SET_MIN_RATING", payload: val });
  }

  return (
    <div>
      <h3 className="text-foreground-muted mb-1 text-xs font-semibold tracking-wider uppercase">
        Minimum Rating
      </h3>
      <StarRating value={rating} onValueChange={handleChange} />
    </div>
  );
}
