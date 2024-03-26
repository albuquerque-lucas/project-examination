import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import LoginForm from '../../../components/general/forms/LoginForm.jsx';
import './styles/style.css';

export default function Login() {

  return (
    <div className='login_page__container'>
      <LoginForm />
    </div>
  );
}