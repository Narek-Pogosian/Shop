"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface ScrollListProps<T> {
  render: (item: T) => React.ReactNode;
  items: T[] | undefined;
}

export default function ScrollList<T extends { id: number | string }>({
  items,
  render,
}: ScrollListProps<T>) {
  if (!items) {
    return <ScrollListContainer>No items</ScrollListContainer>;
  }

  return (
    <ScrollListContainer>
      <ScrollListImplementation>
        {items.map((item) => (
          <li key={item.id} className="w-48 flex-shrink-0 max-md:snap-center">
            {render(item)}
          </li>
        ))}
      </ScrollListImplementation>
    </ScrollListContainer>
  );
}

function ScrollListContainer({ children }: { children: React.ReactNode }) {
  return <div className="relative h-[369px]">{children}</div>;
}

function ScrollListImplementation({ children }: { children: React.ReactNode }) {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const listRef = useRef<HTMLUListElement | null>(null);

  const scroll = useCallback(
    (direction: 1 | -1) =>
      listRef.current?.scrollBy({
        left: direction * (listRef.current.clientWidth - 120),
        behavior: "smooth",
      }),
    [],
  );

  useEffect(() => {
    if (listRef.current) {
      const { scrollWidth, clientWidth } = listRef.current;
      setIsAtEnd(scrollWidth <= clientWidth);
    }
  }, []);

  const handleScroll = ({ currentTarget }: React.UIEvent<HTMLUListElement>) => {
    const { scrollWidth, scrollLeft, clientWidth } = currentTarget;
    setIsAtEnd(scrollWidth - scrollLeft < clientWidth + 10);
    setIsAtStart(scrollLeft < 10);
  };

  return (
    <>
      <Button
        size="icon"
        aria-hidden
        className="absolute top-1/3 -left-0 z-20 rounded-full shadow-lg disabled:opacity-0 xl:-left-5"
        onClick={() => scroll(-1)}
        disabled={isAtStart}
      >
        <ArrowLeft />
      </Button>

      <ul
        ref={listRef}
        onScroll={handleScroll}
        className="scrollbar-thin flex gap-4 overflow-x-auto px-1 pt-1 pb-4"
      >
        {children}
      </ul>

      <div
        className={cn(
          "from-background pointer-events-none absolute top-0 -left-1 z-10 h-[calc(100%-22px)] w-16 bg-gradient-to-r to-transparent opacity-100 transition-opacity duration-500 md:w-28",
          { "opacity-0": isAtStart },
        )}
      />
      <div
        className={cn(
          "to-background pointer-events-none absolute top-0 -right-1 z-10 h-[calc(100%-22px)] w-16 bg-gradient-to-r from-transparent opacity-100 transition-opacity duration-500 dark:md:w-28",
          { "opacity-0": isAtEnd },
        )}
      />

      <Button
        size="icon"
        aria-hidden
        className="absolute top-1/3 -right-0 z-20 rounded-full shadow-lg disabled:opacity-0 xl:-right-5"
        onClick={() => scroll(1)}
        disabled={isAtEnd}
      >
        <ArrowRight />
      </Button>
    </>
  );
}
