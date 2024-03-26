import { useRef, useContext, useEffect } from 'react';
import { Link, Navigate, useNavigate, useLocation, redirect } from 'react-router-dom';
import axios from '../../../axios';
import { AuthContext } from '../../../context/Authentication/AuthContext.js';
import './styles/style.css';

export default function LoginForm() {
  const { user, setUser } = useContext(AuthContext);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const stayConnectedRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('USUARIO', user);
}, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };

    await axios.get('http://localhost/sanctum/csrf-cookie');

    try {
			const resp = await axios.post('/admin/login', body);
			if (resp.status === 200) {
				setUser(resp.data.user);
        navigate('/admin/home');
			}
		} catch (error) {
        console.error('Error: ', error.response.data.message);
    }
    console.log('Username: ', usernameRef.current?.value);
    console.log('Password: ', passwordRef.current?.value);
    console.log('Stay connected: ', stayConnectedRef.current?.checked);
  };

  return (
    <div className="login_form__container">
      <form className="login_form" onSubmit={ handleSubmit }>
      <h3>SIGN IN TO YOUR ACCOUNT</h3>

        <div className="login_form__input">
          <input
            type="text"
            id="username"
            name="username"
            placeholder='your.username'
            ref={usernameRef}
            />
        </div>

        <div className="login_form__input">
          <input
            type="password"
            id="password"
            name="password"
            placeholder='******'
            ref={passwordRef}
            />
        </div>

        <div className="login_form__input input_checkbox">
          <input type="checkbox" id="stayConnected" name="stayConnected" ref={stayConnectedRef} />
          <label htmlFor="stayConnected">Keep me signed in</label>
        </div>
        <div className="login_form__input">
          <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
  );
}