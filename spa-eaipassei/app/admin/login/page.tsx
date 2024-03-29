'use client';

import React, { useRef } from 'react';
import style from '@/app/ui/admin/login/login.module.css';
import { signIn } from 'next-auth/react';
import GoogleButton from 'react-google-button';
import axios from '@/app/lib/axios/axios';

export default function Page() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const stayConnectedRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(JSON.stringify(process.env.NEXT_PUBLIC_BASE_API_URL));
    // const username = usernameRef.current?.value;
    // const password = passwordRef.current?.value;
    // const stayConnected = stayConnectedRef.current ? stayConnectedRef.current.checked : false;

    const body = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
      callbackUrl: 'http://localhost/api/admin/login',
    };

    
    // try {
    //   await axios.get(`${process.env.NEXT_PUBLIC_SANCTUM_CSRF_COOKIE_URL}`);
		// 	const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_LOGIN_ENDPOINT}`, body);
		// 	if (resp.status === 200) {
		// 		console.log(resp.data);
		// 	}
		// } catch (error) {
    //     console.error('Error: ', error);
    // }

    const result = await signIn('credentials', body);

    if (result && result.error) {
      console.error(result.error);
    } else if (result && result.ok) {
      console.log('Sucesso!!!');
    }

    console.log(result);

  }
  return (
    <div className={ style.login_page__container }>
      <div className={ style.login_form__container }>
        <form
          className={ style.login_form }
          // onSubmit={ handleSubmit }
          >
        <h3 className={ style.login_form__title }>SIGN IN TO YOUR ACCOUNT</h3>

          <div className={ style.login_form__input }>
            <input
              type="text"
              id="username"
              name="username"
              placeholder='your.username'
              ref={usernameRef}
              />
          </div>

          <div className={ style.login_form__input }>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='******'
              ref={passwordRef}
              />
          </div>

          <div 
            className={`${ style.input_checkbox }`}
            >
            <input
              type="checkbox"
              id="stayConnected"
              name="stayConnected"
              className={ style.input_stay__connected }
              ref={stayConnectedRef}
              />
            <label htmlFor="stayConnected">Keep me signed in</label>
          </div>
          <div className={ style.login_form__input }>
            <button
              type="submit"
              className={ style.submit_button }
              onClick={ (e) => handleLogin(e) }
              >Entrar
            </button>
          </div>
            <GoogleButton
              type='dark'
              onClick={ () => signIn('google') }
            />

        </form>
      </div>
    </div>
  )
}