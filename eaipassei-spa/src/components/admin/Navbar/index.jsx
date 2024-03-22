import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faBook } from '@fortawesome/free-solid-svg-icons';
import './styles/style.css';
import LayoutContext from '../../../context/Layout/LayoutContext.js';

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
          

          <FontAwesomeIcon icon={ faBars } className='navbar-bars'/>
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
              <FontAwesomeIcon icon={ faUser } className='navbar-bars'/>
              <Link to="/" className="nav-link active">
                Usuários
              </Link>
            </li>
            <li className="nav-item">
              <FontAwesomeIcon icon={ faBars } className='navbar-bars'/>
              <Link to="/admin/manage/api/examinations" className="nav-link">
                Concursos
              </Link>
            </li>
            <li className="nav-item">
              <FontAwesomeIcon icon={ faBook } className='navbar-bars'/>
              <Link to="/api" className="nav-link">
                Editais
              </Link>
            </li>
            <li className="nav-item">
              <FontAwesomeIcon icon={ faBars } className='navbar-bars'/>
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
