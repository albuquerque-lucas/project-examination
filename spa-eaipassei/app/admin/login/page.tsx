'use client';

import React, { useRef, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { makeLogin } from '@/app/lib/api/authenticationAPI';
import MessageBox from './messageBox';
import { AuthContext } from '../../lib/context/AuthContext';
import { SpinnerCircular } from 'spinners-react';
import { motion } from 'framer-motion';
import { authCodeMapper } from '@/app/lib/utils/authCodeMapper';
import style from '@/app/ui/admin/login/login.module.css';

export default function LoginAdmin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const stayConnectedRef = useRef<HTMLInputElement>(null);
  const [requestingLogin, setRequestingLogin] = useState<boolean>(false);
  const router = useRouter();
  const { user, setUser, authMessage, setAuthMessage } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      router.push('/admin/home');
    }
  }, [authMessage, user]);
  
  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // const stayConnected = stayConnectedRef.current ? stayConnectedRef.current.checked : false;
    const body = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
      callbackUrl: process.env.NEXT_PUBLIC_API_LOGIN_ROUTE,
      redirect: false,
    };
    setRequestingLogin(true);
    try {
        const loggedIn = await makeLogin(body);
        setUser(loggedIn.user);
        setAuthMessage({
          message: loggedIn.message,
          type: loggedIn.type,
          code: authCodeMapper.login
        });
        setRequestingLogin(false);
        router.push('/admin/home');
		} catch (error: any) {
        setAuthMessage({ message: error.response.data.message, type: 'error' });
        console.error('Error: ', error.response.data);
        setRequestingLogin(false);
    }
  }
  return (
    <motion.div
      className={ style.login_page__container }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      >
      <div className={ style.login_form__container }>
        <div className={ style.message_box__container}>
          {
            authMessage && authMessage.code !== authCodeMapper.login &&
              <MessageBox
                message={ authMessage.message }
                setMessage={ setAuthMessage }
                type={ authMessage.type }
              /> 
            }
        </div>
        <form
          className={ style.login_form }
          >
        <h3 className={ style.login_form__title }>
          SIGN IN TO YOUR ACCOUNT
        </h3>

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
            <motion.button
              type="submit"
              className={ style.submit_button }
              whileHover={{color: '#fff', backgroundColor: '#4F525A'}}
              onClick={ (e) => handleLogin(e) }
              >
              {
                requestingLogin ?
                <div>
                  <SpinnerCircular
                    className={ style.loading_spinner }
                  />
                </div>
                :
                'Entrar'
              }
            </motion.button>
          </div>

        </form>
      </div>
    </motion.div>
  )
}