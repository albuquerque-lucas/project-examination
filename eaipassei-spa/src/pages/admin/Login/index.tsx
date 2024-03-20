import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginForm from '../../../components/general/forms/LoginForm';
import './styles/style.css';

export default function Login() {
  return (
    <div className='login_page__container'>
      <LoginForm />
    </div>
  );
}