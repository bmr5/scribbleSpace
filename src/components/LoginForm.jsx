import React from 'react';
// Creates LoginForm, allows for input of username,password, and room number.
function LoginForm(props) {
  return (
    <div className='loginBox'>
      <form onSubmit={props.handleLogin}>
        <div className='inputBoxOnLoginComponent'>
          <label>
            {/* Username input field */}
            <input
              placeholder='Username'
              type='text'
              value={props.name}
              onChange={props.handleChangeName}
            />
          </label>
          <label>
            {/* Password input field */}
            <input
              placeholder='Password'
              type='text'
              value={props.password}
              onChange={props.handleChangePassword}
            />
          </label>
          {/* Main submit button */}
          <input id='loginButton' type='submit' value='Login' />
        </div>
      </form>
      <form action='/google' method='GET'>
        <input id='googleLogin' type='submit' value='Google' />
      </form>
      <div>
        <input id='forgotPassword' type='submit' value='Forgot Password' />
        <input id='creatAccount' type='submit' value='Create Account' />
      </div>
      <img id='scribbleLogo' src='scribble-svgrepo-com.svg' alt='' />
    </div>
  );
}

export default LoginForm;
