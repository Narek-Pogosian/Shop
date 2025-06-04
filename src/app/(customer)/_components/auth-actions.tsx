"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function SignInButton() {
  return (
    <Button size="sm" asChild>
      <Link href="/login">Sign in</Link>
    </Button>
  );
}

export function SignOutButton() {
  return (
    <Button size="sm" onClick={() => signOut()}>
      Sign out
    </Button>
  );
}
