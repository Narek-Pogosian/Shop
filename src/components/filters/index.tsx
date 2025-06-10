import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Category } from "@prisma/client";
import { Filter } from "lucide-react";

export default function FiltersDialog({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-4!">
          <Filter /> Filters
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>TODO</DialogDescription>
        </DialogHeader>

        <pre>{JSON.stringify(categories, null, 2)}</pre>

        <DialogFooter>
          <Button size="sm">Save changes</Button>
          <DialogClose asChild>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
