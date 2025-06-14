import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import Logo from "@/components/logo";
// import Cart from "../cart";
import { getServerAuthSession } from "@/server/auth";
import { SignInButton, SignOutButton } from "./auth-actions";

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="mb-4 border-b border-black/10 bg-white/50 py-3 shadow-sm shadow-neutral-200 md:mb-8 dark:border-white/10 dark:bg-black/10 dark:shadow dark:shadow-black">
      <div className="container flex items-center justify-between">
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
        <div className="flex items-center gap-1">
          <ThemeToggle />
          {/* <Cart /> */}
          {session ? <SignOutButton /> : <SignInButton />}
        </div>
      </div>
    </header>
  );
}
