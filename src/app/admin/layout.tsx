import { getServerAuthSession } from "@/server/auth";
import { AppSidebar } from "./_components/app-sidebar";
import { redirect } from "next/navigation";

async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();
  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex">
      <AppSidebar />
      <main className="mx-auto w-full max-w-[1400px] p-4 md:px-12 md:py-12 lg:px-28 xl:px-40">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
