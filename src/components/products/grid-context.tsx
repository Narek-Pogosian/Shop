"use client";

import { createContext, useContext, useState } from "react";

interface GridContextType {
  showDescriptiveGrid: boolean;
  toggleDescriptiveGrid: () => void;
}

const GridContext = createContext<GridContextType | null>(null);

export const GridContextProvider = ({
  children,
  defaultValue,
}: {
  children: React.ReactNode;
  defaultValue: boolean;
}) => {
  const [showDescriptiveGrid, setShowDescriptiveGrid] = useState(defaultValue);

  function toggleDescriptiveGrid() {
    setShowDescriptiveGrid((prev) => {
      if (prev) {
        document.cookie = "descriptive-grid=false";
      } else {
        document.cookie = "descriptive-grid=true";
      }

      return !prev;
    });
  }

  return (
    <GridContext.Provider
      value={{ toggleDescriptiveGrid, showDescriptiveGrid }}
    >
      {children}
    </GridContext.Provider>
  );
};

export function useGridContext() {
  const context = useContext(GridContext);

  if (!context) {
    throw Error("useGridContext can only be used inside GridContextProvider");
  }

  return context;
}
