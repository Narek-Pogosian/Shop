import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      Home page
      <div>
        <Link href="login">Sign in</Link>
      </div>
    </div>
  );
}
