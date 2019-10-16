import React from 'react';

const Signup = (props) => {
  return (
    <form className='createUser' onSubmit={() => props.createUser(userEvent, pwEvent)}>
      <input className='userName' name='username' placeholder='Username' value={userEvent} />
      <input className='password' name='password' placeholder='Password' value={pwEvent} />
      <input className='createUser' type='submit' value='Submit' />
    </form>
  )
}

export default Signup;