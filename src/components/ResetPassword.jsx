import React from 'react';

const ResetPassword = props => {
  return (
    // <form className='resetForm' onSubmit={() => props.resetPassword(userEvent, pwEvent)}>
    //   <input className='userName' name='username' placeholder='Username' value={userEvent} />
    //   <input className='newPassword' name='newPassword' placeholder='New Password' value={pwEvent} />
    //   <input className='submitNewPw' type='submit' value='Submit' />
    // </form>
    <div className='loginBox'>
      <img id='scribbleLogo' src='scribble-svgrepo-com.svg' alt='' />
      <form className='resetForm'>
        <div className='inputBoxOnLoginComponent'>
          <input className='userName' name='username' placeholder='Username' />
          <input
            className='newPassword'
            name='newPassword'
            placeholder='New Password'
          />
          <input
            id='loginButton'
            className='submitNewPw'
            type='submit'
            value='Reset'
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
