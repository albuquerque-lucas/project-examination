import ScrollToTop from "react-scroll-to-top";
import { ReactNode } from "react";
import AdminNavbar from "../components/admin/Navbar";
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LayoutContext from "../context/Layout/LayoutContext";
import './styles/style.css';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { handleMenuToggler } = useContext(LayoutContext);
  const location = useLocation();

  useEffect(() => {
    handleMenuToggler(false);
  }, [location]);
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