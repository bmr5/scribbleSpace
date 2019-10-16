import React from 'react';

const ResetPassword = (props) => {
  return (
    <form className='resetForm' onSubmit={() => props.resetPassword(userEvent, pwEvent)}>
      <input className='userName' name='username' placeholder='Username' value={userEvent} />
      <input className='newPassword' name='newPassword' placeholder='New Password' value={pwEvent} />
      <input className='submitNewPw' type='submit' value='Submit' />
    </form>
  )
}

export default ResetPassword;