import ScrollToTop from "react-scroll-to-top";
import { useState } from "react";
import AdminNavbar from "../components/admin/Navbar";
import { useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import LayoutContext from "../context/Layout/LayoutContext";
import { AuthContext } from "../context/Authentication/AuthContext";
import useAuthValidation from "../hooks/useAuthValidation";
import axios from '../axios';
import './styles/style.css';


export default function AdminLayout({ children }) {
  const {
    user,
    setUser,
    authenticated,
    setAuthenticated
  } = useContext(AuthContext);
  const { setActive } = useContext(LayoutContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('AdminLayout', location.pathname);
    console.log('AdminLayout', isLoggedIn);
    console.log('Foi renderizado!!!!!!');
    setActive(false);
    let loggedIn = fetchUser();
    setIsLoggedIn(loggedIn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const fetchUser = async () => {
    let loggedIn;
    try {
      const resp = await axios.get('/admin/user');
      if (resp.status === 200) {
        console.log('Deu bom');
        console.log('User', resp.data);
        setUser(resp.data);
        setAuthenticated(true);
        console.log('Authenticated2222', authenticated);
        loggedIn = true;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('AuthError', error);
        console.log('Nao deu bom');
        localStorage.removeItem('user');
        console.log('Authenticated3333', authenticated);
        loggedIn = false;
        navigate('/admin/login');
      }
      setAuthenticated(false);
    }
    return loggedIn;
  }

  return (
    <div className="admin-layout">
      <AdminNavbar/>
      <div className="admin-layout__content">
        { !user || Object.keys(user).length === 0 ? 
          <>
            <Navigate to='/admin/login' /> 
            {location.pathname === '/admin/login' ? <Outlet /> : <Navigate to='/admin/login' /> }
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