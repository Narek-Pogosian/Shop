"use client";

import { cn } from "@/lib/utils";
import { useGridContext } from "./grid-context";

export default function ProductGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showDescriptiveGrid } = useGridContext();

  return (
    <ul
      className={cn("grid w-full gap-10", {
        "grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4":
          !showDescriptiveGrid,
      })}
    >
      {children}
    </ul>
  );
}
