"use client";

import { useGridContext } from "./grid-context";
import { Grid3X3, List } from "lucide-react";
import { Button } from "../ui/button";

export default function GridToggle() {
  const { showDescriptiveGrid, toggleDescriptiveGrid } = useGridContext();

  return (
    <Button
      size="icon"
      variant="outline"
      aria-pressed={showDescriptiveGrid}
      className="border-input-border"
      onClick={toggleDescriptiveGrid}
    >
      {showDescriptiveGrid ? <Grid3X3 /> : <List />}
    </Button>
  );
}
