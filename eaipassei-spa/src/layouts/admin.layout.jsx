import ScrollToTop from "react-scroll-to-top";
import { useState } from "react";
import AdminNavbar from "../components/admin/Navbar";
import { useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import LayoutContext from "../context/Layout/LayoutContext";
import { AuthContext } from "../context/Authentication/AuthContext";
import useAuthValidation from "../hooks/useAuthValidation";
import './styles/style.css';


export default function AdminLayout({ children }) {
  const [user, setUser] = useState();
  const { setActive } = useContext(LayoutContext);
  const location = useLocation();
  const [isLoggedIn] = useAuthValidation();

  useEffect(() => {
    console.log('AdminLayout', location.pathname);
    console.log('AdminLayout', isLoggedIn);
    setActive(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="admin-layout">
      <AdminNavbar/>
      <div className="admin-layout__content">
      { !isLoggedIn || isLoggedIn === undefined ? 
          <>
            <Navigate to='/admin/login' /> 
            {location.pathname === '/admin/login' && <Outlet />}
          </>
          :
          <Outlet />
        }
      </div>
      <ScrollToTop
          smooth
          color='#fff'
          className='scroll-to-top'
        />
    </div>
  );
}