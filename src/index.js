import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Styles from './styles.css';
import App from './App.jsx';
import ResetPassword from './components/ResetPassword';
import Signup from './components/Signup';

const Scribble = () => (
  <div>
    <App />
  </div>
);

const IndexPage = () => {
  return (
    <div>
      <App />
    </div>
  );
};

const UsersPage = () => {
  return (
    <>
      {users.map((user, index) => (
        <h5 key={index}>
          <Link to={`/user/${index + 1}`}>{user.name}'s Page</Link>
        </h5>
      ))}
    </>
  );
};

const UserPage = ({ match, location }) => {
  const {
    params: { userId }
  } = match;

  return (
    <>
      <p>
        <strong>User ID: </strong>
        {userId}
      </p>
      <p>
        <strong>User Name: </strong>
        {users[userId - 1].name}
      </p>
    </>
  );
};

const PropsPage = ({ title }) => {
  return <h3>{title}</h3>;
};

const NoMatchPage = () => {
  return <h3>404 - Not found</h3>;
};

const Zapp = () => {
  return (
    <section className='App'>
      <h1 className='logoMain'>
        <a href='/'>scribbleSpace</a>
      </h1>
      <Router>
        <Switch>
          <Route exact path='/' component={IndexPage} />
          {/* <Route exact path='/users' component={UsersPage} /> */}
          <Route exact path='/forgot-password' component={ResetPassword} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/user/:userId' component={UserPage} />
          <Route
            exact
            path='/props'
            render={props => (
              <PropsPage {...props} title={`send props through render`} />
            )}
          />
          <Route component={NoMatchPage} />
        </Switch>
      </Router>
    </section>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<Zapp />, rootElement);
// ReactDOM.render(<Scibble />, document.getElementById('root'));
