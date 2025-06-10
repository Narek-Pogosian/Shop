import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import Logo from "@/components/logo";
// import Cart from "../cart";
import { getServerAuthSession } from "@/server/auth";
import { SignInButton, SignOutButton } from "./auth-actions";

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <header>
      <div className="container flex h-16 items-center justify-between">
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
