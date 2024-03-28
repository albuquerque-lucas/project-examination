import { useContext, useEffect } from 'react';
import { AdminLayoutContext } from '@/app/lib/context/AdminLayoutContext';
import colors from '@/app/ui/admin/colors.module.css';
import navbar from '@/app/ui/admin/navbar.module.css';
import { FaBook } from 'react-icons/fa';
import { IoIosSchool } from "react-icons/io";
import { PiExamFill } from "react-icons/pi";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { FaUsers, FaBars } from "react-icons/fa6";
import Link from 'next/link';

export default function Navbar() {
  const { sidebarOpen, setSidebarOpen } = useContext(AdminLayoutContext);
  const handleToggler = () => {
    setSidebarOpen(!sidebarOpen);
  }
  return (
    <nav className={`${colors.primary_bg__dark} ${navbar.admin_navbar}`}>
      <div className={ navbar.admin_navbar__container }>
        <button
          className={`container ${navbar.admin_navbar__toggler}`}
          type="button"
          onClick={() => handleToggler() }
          >
          

          <FaBars />
        </button>
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
            <Link href="/admin/manage/users">
              <li className="nav-item">
                <FaUsers />
                  Usuários
              </li>
            </Link>
            <Link href="/admin/manage/examinations" className="nav-link">
              <li className="nav-item">
                <PiExamFill />
                  Concursos
              </li>
            </Link>
            <Link href="/admin/manage/notices" className="nav-link">
              <li className="nav-item">
                <FaBook />
                  Editais
              </li>
            </Link>
            <Link href="/admin/manage/subjects" className="nav-link">
              <li className="nav-item">
                <IoIosSchool />
                  Matérias
              </li>
            </Link>
            <Link href="/admin/login" className="nav-link">
              <li className="nav-item">
                <BiLogInCircle />
                  Login
              </li>
            </Link>
            <li className="nav-item">
            <BiLogOutCircle />
              <button
                className={ navbar.logout_btn }
                // onClick={ handleLogout }
                >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}