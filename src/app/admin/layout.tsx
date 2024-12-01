import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "./_components/app-sidebar";

async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();
  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar session={session} />
      <main className="w-full p-4">
        <SidebarTrigger className="md:hidden" />
        {children}
      </main>
    </SidebarProvider>
  );
}

export default AdminLayout;
