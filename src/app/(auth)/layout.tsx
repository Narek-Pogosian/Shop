import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-full content-center px-4 lg:col-span-2">
      <Button variant="secondary" asChild>
        <Link href="/" className="absolute top-4 left-4 lg:top-8 lg:left-8">
          <MoveLeft />
          Shop
        </Link>
      </Button>

      <div className="shadow-card bg-card mx-auto max-w-lg rounded p-8">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
