import  { useContext } from 'react';
import LayoutContext from '../../../context/Layout/LayoutContext.js';
import { Link, useNavigate } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';
import { IoIosSchool } from "react-icons/io";
import { PiExamFill } from "react-icons/pi";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { FaUsers, FaBars } from "react-icons/fa6";
import axios from '../../../axios.js';
import './styles/style.css';

export default function AdminNavbar() {
  const { active, setActive } = useContext(LayoutContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
		try {
			const resp = await axios.post('/admin/logout');
			if (resp.status === 200) {
				localStorage.removeItem('user');
				navigate('/admin/login');
			}
		} catch (error) {
			console.log(error);
		}
  };

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
              <Link to="/admin/manage/api/users" className="nav-link active">
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
              <FaBook />
              <Link to="/admin/manage/api/notices" className="nav-link">
                Editais
              </Link>
            </li>
            <li className="nav-item">
              <IoIosSchool />
              <Link to="/admin/manage/api/subjects" className="nav-link">
                Matérias
              </Link>
            </li>
            <li className="nav-item">
              <BiLogInCircle />
              <Link to="/admin/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
            <BiLogOutCircle />
              <button
                className='logout-btn'
                onClick={ handleLogout }
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
