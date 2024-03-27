export default function Page() {
  return (
    <div className='login_page__container'>
      <div className="login_form__container">
        <form
          className="login_form"
          // onSubmit={ handleSubmit }
          >
        <h3>SIGN IN TO YOUR ACCOUNT</h3>

          <div className="login_form__input">
            <input
              type="text"
              id="username"
              name="username"
              placeholder='your.username'
              // ref={usernameRef}
              />
          </div>

          <div className="login_form__input">
            <input
              type="password"
              id="password"
              name="password"
              placeholder='******'
              // ref={passwordRef}
              />
          </div>

          <div className="login_form__input input_checkbox">
            <input
              type="checkbox"
              id="stayConnected"
              name="stayConnected"
              // ref={stayConnectedRef}
              />
            <label htmlFor="stayConnected">Keep me signed in</label>
          </div>
          <div className="login_form__input">
            <button type="submit">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}