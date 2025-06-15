import { Skeleton } from "@/components/ui/skeleton";
import ScrollTop from "@/components/scroll-top";

export default function ProductLoading() {
  return (
    <>
      <ScrollTop />
      <section className="mb-12 flex w-full flex-col gap-8 sm:flex-row xl:gap-16">
        <div className="relative aspect-[9/11] h-fit w-full shrink-0 sm:w-72 lg:w-96 xl:w-[500px]">
          {/* Image */}
          <Skeleton className="h-full w-full" />

          {/* Mobile Info */}
          <div className="absolute inset-0 p-8 sm:hidden">
            <Skeleton className="mb-2 h-7" />
            <Skeleton className="mb-4 h-6 w-20" />

            <Skeleton className="mb-2 h-4" />
            <Skeleton className="mb-2 h-4" />
            <Skeleton className="mb-2 h-4" />
            <Skeleton className="mb-2 h-4" />
            <Skeleton className="h-4" />
          </div>
        </div>

        {/* Desktop info */}
        <div className="w-full">
          <Skeleton className="mb-4 h-7 max-sm:hidden" />
          <Skeleton className="h-5 w-16" />

          <hr className="my-5 max-sm:hidden" />
          <Skeleton className="mb-2 h-5 max-w-xl max-sm:hidden" />
          <Skeleton className="mb-2 h-5 max-w-xl max-sm:hidden" />
          <Skeleton className="h-5 max-w-xl max-sm:hidden" />
          <hr className="my-5 max-sm:hidden" />

          <div className="mb-4">
            <Skeleton className="mb-1 h-4 w-12" />
            <ul className="flex flex-wrap gap-2">
              <Skeleton className="h-9 w-10" />
              <Skeleton className="h-9 w-10" />
              <Skeleton className="h-9 w-10" />
              <Skeleton className="h-9 w-10" />
            </ul>
          </div>
          <div className="mb-5">
            <Skeleton className="mb-1 h-4 w-12" />
            <ul className="flex flex-wrap gap-2">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </ul>
          </div>

          <div className="flex gap-1">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      </section>
    </>
  );
}
