import Link from "next/link";
import LoginForm from "../_components/login-form";

function LoginPage() {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      <LoginForm />
      <p className="mt-10 text-center text-sm font-medium">
        Don&apos;t have an account,{" "}
        <Link href="/register" className="text-accent-text hover:underline">
          register here
        </Link>
      </p>
    </>
  );
}

export default LoginPage;
