import  { useContext } from 'react';
import LayoutContext from '../../../context/Layout/LayoutContext.js';
import { Link } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';
import { IoIosSchool } from "react-icons/io";
import { PiExamFill } from "react-icons/pi";
import { FaUsers, FaBars } from "react-icons/fa6";
import './styles/style.css';

export default function AdminNavbar() {
  const { active, setActive } = useContext(LayoutContext);

  return (
    <nav className="admin_navbar">
      <div className="container admin_navbar__container">
        <button
          className="admin_navbar__toggler"
          type="button"
          onClick={() => setActive(!active) }
          >
          

          <FaBars />
        </button>
        <Link to="/admin/home" className="navbar-brand">
          <h3 className='navbar_brand'>
              EaiPassei Admin
          </h3>
        </Link>
        <div className={`admin_navbar__menu ${active ? 'open' : ''}`}>
          <ul>
            <li className='nav-item'>
              <h3>CPanel - API</h3>
            </li>
            <li className="nav-item">
              <FaUsers />
              <Link to="/" className="nav-link active">
                Usuários
              </Link>
            </li>
            <li className="nav-item">
              <PiExamFill />
              <Link to="/admin/manage/api/examinations" className="nav-link">
                Concursos
              </Link>
            </li>
            <li className="nav-item">
              <FaBook/>
              <Link to="/api" className="nav-link">
                Editais
              </Link>
            </li>
            <li className="nav-item">
              <IoIosSchool/>
              <Link to="/api" className="nav-link">
                Matérias
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
