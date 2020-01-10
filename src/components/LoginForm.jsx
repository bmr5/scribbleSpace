import React, { Link } from 'react';
// Creates LoginForm, allows for input of username,password, and room number.
function LoginForm(props) {
  return (
    <div className='loginBox'>
      <img id='scribbleLogo' src='scribble-svgrepo-com.svg' alt='' />
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
      <a className='google' href='/google'>
        <img src='/google.png' />
      </a>
      <div className='links'>
        <a href='/forgot-password'>FORGOT PASSWORD?</a>
        <a href='/signup'>SIGNUP</a>
      </div>
    </div>
  );
}

export default LoginForm;
