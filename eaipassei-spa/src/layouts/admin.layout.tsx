import ScrollToTop from "react-scroll-to-top";
import { ReactNode } from "react";
import AdminNavbar from "../components/admin/Navbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="admin-layout">
      <AdminNavbar/>
      <div className="admin-layout__content">
        {children}
      </div>
      <ScrollToTop
          smooth
          color='#fff'
          className='scroll-to-top'
        />
    </div>
  );
}