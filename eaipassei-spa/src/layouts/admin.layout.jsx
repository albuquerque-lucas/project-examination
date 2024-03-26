import ScrollToTop from "react-scroll-to-top";
import AdminNavbar from "../components/admin/Navbar";
import { useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import LayoutContext from "../context/Layout/LayoutContext";
import { AuthContext } from "../context/Authentication/AuthContext";
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
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    setActive(false);
    checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const checkAuthentication = async () => {
    try {
      const resp = await axios.get('/admin/user');
      if (resp.status === 200) {
        console.log('Authenticated : ', authenticated);
        setUser(resp.data);
        setAuthenticated(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('AuthError', error);
        console.log('Authenticated : ', authenticated);
        localStorage.removeItem('user');
        setAuthenticated(false);
        navigate('/admin/login');
      }
    }
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