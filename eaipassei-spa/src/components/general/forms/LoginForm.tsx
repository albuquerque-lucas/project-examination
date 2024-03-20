import React, { useRef } from 'react';
import './styles/style.css';

export default function LoginForm() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const stayConnectedRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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