"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ProductPagination({
  currentPage,
  totalPages,
}: {
  totalPages: number;
  currentPage: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function changePage(p: number) {
    if (p < 1 || p > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", p.toString());

    router.push(`?${params.toString()}`);
  }

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => changePage(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            className={cn({
              "pointer-events-none opacity-40": currentPage <= 1,
            })}
          />
        </PaginationItem>
        {new Array(totalPages).fill(0).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => changePage(i + 1)}
              isActive={i + 1 === currentPage}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => changePage(currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            className={cn({
              "pointer-events-none opacity-40": currentPage >= totalPages,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
