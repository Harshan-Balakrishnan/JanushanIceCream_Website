import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Janushan Admin",
  robots: { index: false, follow: false, noarchive: true, nocache: true },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
