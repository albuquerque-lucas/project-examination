import AdminLayout from "./AdminLayout";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      { children }
    </AdminLayout>
  );
}