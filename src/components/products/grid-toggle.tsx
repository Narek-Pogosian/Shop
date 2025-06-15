"use client";

import { LayoutGrid, List } from "lucide-react";
import { useGridContext } from "./grid-context";
import { Button } from "../ui/button";

export default function GridToggle() {
  const { showDescriptiveGrid, toggleDescriptiveGrid } = useGridContext();

  return (
    <Button
      size="icon"
      variant="secondary"
      aria-pressed={showDescriptiveGrid}
      onClick={toggleDescriptiveGrid}
    >
      {showDescriptiveGrid ? <List /> : <LayoutGrid />}
    </Button>
  );
}
