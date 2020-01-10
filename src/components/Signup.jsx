import React from 'react';

const Signup = props => {
  return (
    // <form className='createUser' onSubmit={() => props.createUser(userEvent, pwEvent)}>
    //   <input className='userName' name='username' placeholder='Username' value={userEvent} />
    //   <input className='password' name='password' placeholder='Password' value={pwEvent} />
    //   <input className='createUser' type='submit' value='Submit' />
    // </form>
    <div className='loginBox'>
      <img id='scribbleLogo' src='scribble-svgrepo-com.svg' alt='' />
      <div className='inputBoxOnLoginComponent'>
        <form className='createUser'>
          <input className='userName' name='username' placeholder='Username' />
          <input className='password' name='password' placeholder='Password' />
          <input
            id='loginButton'
            className='createUser'
            type='submit'
            value='Signup'
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
