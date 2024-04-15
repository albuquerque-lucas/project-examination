'use client';

import { useContext, useEffect } from 'react';
import { AdminLayoutContext } from '@/app/lib/context/AdminLayoutContext';
import { AuthContext } from '../lib/context/AuthContext';
import colors from '@/app/ui/admin/colors.module.css';
import navbar from '@/app/ui/admin/navbar.module.css';
import { BiLogInCircle } from "react-icons/bi";
import { FaBars } from "react-icons/fa6";
import Link from 'next/link';
import AuthenticatedOnlyLinksBundle from './manage/links/authenticatedOnlyLinksBundle';
import NavbarItem from '../lib/components/ListItems/navbarItem';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { sidebarOpen, setSidebarOpen } = useContext(AdminLayoutContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {

  }, [user]);

  const handleToggler = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    className={`${colors.primary_bg__dark} ${navbar.admin_navbar}`}
    >
      <div className={ navbar.admin_navbar__container }>
        <motion.button
          className={`container ${navbar.admin_navbar__toggler}`}
          type="button"
          onClick={() => handleToggler() }
          whileTap={{ scale: 0.9 }}
          whileHover={{ color: '#fff' }}
          >
          

          <FaBars />
        </motion.button>
        <Link href="/admin/home">
          <h3 className={ navbar.navbar_brand }>
              EaiPassei Admin
          </h3>
        </Link>
        <div className={` ${navbar.admin_navbar__menu} ${sidebarOpen ? navbar.menu_open : ''}`}>
          <ul>
            <li className='nav-item'>
              <h3>CPanel - API</h3>
            </li>
            <AuthenticatedOnlyLinksBundle />
            <Link href="/admin/login" className="nav-link">
              <NavbarItem>
                <BiLogInCircle />
                  Login
              </NavbarItem>
            </Link>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}