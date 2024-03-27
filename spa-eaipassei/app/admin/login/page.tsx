import style from '@/app/ui/admin/login/login.module.css';

export default function Page() {
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
              // ref={usernameRef}
              />
          </div>

          <div className={ style.login_form__input }>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='******'
              // ref={passwordRef}
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
              // ref={stayConnectedRef}
              />
            <label htmlFor="stayConnected">Keep me signed in</label>
          </div>
          <div className={ style.login_form__input }>
            <button
              type="submit"
              className={ style.submit_button }
              >Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}