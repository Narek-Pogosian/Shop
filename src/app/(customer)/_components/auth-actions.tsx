"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function SignInButton() {
  return (
    <Button size="sm" className="rounded-full" asChild>
      <Link href="/login">Sign in</Link>
    </Button>
  );
}

export function SignOutButton() {
  return (
    <Button size="sm" className="rounded-full" onClick={() => signOut()}>
      Sign out
    </Button>
  );
}
