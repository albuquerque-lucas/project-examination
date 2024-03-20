import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './styles/style.css';

export default function AdminNavbar() {
  return (
    <nav className="admin_navbar">
      <div className="container admin_navbar__container">
        <button class="admin_navbar__toggler" type="button">
          <FontAwesomeIcon icon={ faBars } className='navbar-bars'/>
        </button>
        <Link to="/" className="navbar-brand">
          EaiPassei
        </Link>
        <div className="admin_navbar__menu">
          <ul>
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/api" className="nav-link">
                API
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
