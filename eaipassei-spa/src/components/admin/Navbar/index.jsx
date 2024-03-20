import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './styles/style.css';

export default function AdminNavbar() {
  const [active, setActive] = useState(false);

  return (
    <nav className="admin_navbar">
      <div className="container admin_navbar__container">
        <button
          class="admin_navbar__toggler"
          type="button"
          onClick={() => setActive(!active)}
          >

          <FontAwesomeIcon icon={ faBars } className='navbar-bars'/>
        </button>
        <Link to="/" className="navbar-brand">
          EaiPassei
        </Link>
        <div className={`admin_navbar__menu ${active ? 'open' : ''}`}>
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
