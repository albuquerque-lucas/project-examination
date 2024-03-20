import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './styles/style.css';

export default function AdminHome() {
  return (
    <div className="home_content">
      <h1 className='admin_content__title'>Bem vindo!</h1>
    </div>
  );
}