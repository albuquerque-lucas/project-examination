import ScrollToTop from "react-scroll-to-top";
import { ReactNode } from "react";
import AdminNavbar from "../components/admin/Navbar";
import { useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import LayoutContext from "../context/Layout/LayoutContext";
import { AuthContext } from "../context/Authentication/AuthContext";
import './styles/style.css';


export default function AdminLayout({ children }) {
  const { setActive } = useContext(LayoutContext);
  const location = useLocation();

  useEffect(() => {
    console.log('AdminLayout', location.pathname);
    setActive(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  return (
    <div className="admin-layout">
      <AdminNavbar/>
      <div className="admin-layout__content">
        <Outlet />
      </div>
      <ScrollToTop
          smooth
          color='#fff'
          className='scroll-to-top'
        />
    </div>
  );
}