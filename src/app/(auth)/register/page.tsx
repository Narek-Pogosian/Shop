import Link from "next/link";
import RegisterForm from "../_components/register-form";

function RegisterPage() {
  return (
    <>
      <h1 className="mb-4 text-2xl font-extrabold">Register</h1>
      <RegisterForm />
      <p className="mt-10 text-center text-sm font-medium">
        Already have an account,{" "}
        <Link href="/login" className="text-brand-text hover:underline">
          login here
        </Link>
      </p>
    </>
  );
}

export default RegisterPage;
