import { Boxes, LayoutDashboard, LayoutGrid } from "lucide-react";
import Logo from "@/components/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const items = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Catalog",
    items: [
      {
        title: "Products",
        url: "/admin/products",
        icon: Boxes,
      },
      {
        title: "Categories",
        url: "/admin/categories",
        icon: LayoutGrid,
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <div className="bg-card sticky top-0 left-0 h-screen w-64 shrink-0 p-2">
      <Link href="/" className="mb-4 block px-2 pt-2 font-semibold">
        <Logo />
      </Link>
      <div>
        {items.map((item) => (
          <div key={item.title} className="mb-4">
            <span className="text-foreground-muted mb-1 block text-xs font-semibold">
              {item.title}
            </span>
            <div>
              {item.items.map((item) => (
                <div key={item.title}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={item.url}>
                      <item.icon />
                      {item.title}
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
