import { SignInButton, SignOutButton } from "./auth-actions";
import { getServerAuthSession } from "@/server/auth";
import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import Logo from "@/components/logo";
import Cart from "@/components/cart";

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="sticky top-4 left-0 z-50 container mb-16">
      <div className="bg-card/70 shadow-card mt-0 flex items-center justify-between rounded px-4 py-2 backdrop-blur-md">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/">
            <Logo />
          </Link>
          {session?.user.role === "ADMIN" && (
            <Link href="/admin" className="text-sm font-semibold">
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <ThemeToggle />
            <Cart />
          </div>
          {session ? <SignOutButton /> : <SignInButton />}
        </div>
      </div>
    </header>
  );
}
