import AdminLayout from "./AdminLayout";
import { getServerSession } from "next-auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  console.log('Log do lado do servidor');
  console.log('Log de sessao', session);
  return (
    <AdminLayout>
      { children }
    </AdminLayout>
  );
}