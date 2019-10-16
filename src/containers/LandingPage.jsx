import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import ResetPassword from '../components/ResetPassword';
import Signup from '../components/Signup';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const login = (
      <LoginForm
        handleLogin={this.props.handleLogin}
        name={this.props.name}
        handleChangeName={this.props.handleChangeName}
        password={this.props.password}
        handleChangePassword={this.props.handleChangePassword}
      />
    );
    const resetPw = <ResetPassword resetPassword={this.props.resetPassword} />;
    const signup = <Signup createUser={this.props.createUser} />;
    return <div>{login}</div>;
  }
}

export default LandingPage;
