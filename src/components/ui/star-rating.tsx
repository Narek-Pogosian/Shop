"use client";

import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

interface Props {
  maxRating?: number;
  value?: number;
  onValueChange: (val: number) => void;
}

function StarRating({ maxRating = 5, value, onValueChange }: Props) {
  const currentRating = useRef(value ?? 0);
  const [hoverValue, setHoverValue] = useState(0);

  function handleClick(val: number) {
    if (val === currentRating.current) {
      onValueChange(0);
    } else {
      onValueChange(val);
      currentRating.current = val;
    }
  }

  return (
    <div className="flex w-fit" tabIndex={0}>
      {Array.from({ length: maxRating }, (_, i) => (
        <label
          key={i}
          htmlFor={`star-${i}`}
          className={cn(
            "border-primary text-primary/20 cursor-pointer px-0.5 text-2xl has-[:focus-visible]:border",
            {
              "text-amber-500": (value && i < value) || i < hoverValue,
            },
          )}
          onMouseEnter={() => setHoverValue(i + 1)}
          onMouseLeave={() => setHoverValue(0)}
        >
          <input
            id={`star-${i}`}
            type="radio"
            name="rating"
            value={i + 1}
            onClick={() => handleClick(i + 1)}
            aria-label={`Rate ${i + 1} star`}
            className="sr-only"
          />
          ★
        </label>
      ))}
    </div>
  );
}

export default StarRating;
