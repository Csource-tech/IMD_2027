import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!(await getAdminSession())) redirect("/admin");
  return children;
}
