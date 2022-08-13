import Parse from 'parse/dist/parse.min.js';
import './LoginPage.css';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { GlobalContext } from '../context/GlobalProvider';
import { Header } from '../components/Header';
import { Form } from '../components/Forms/Form';
import { getCurrentUser } from '../utils/users';


export const LoginPage = () => {
  const {user, setUser} = useContext(GlobalContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const loginUser = async(e) => {
    e.preventDefault()

    try {
      await Parse.User.logIn(username, password);
      const currentUser = await getCurrentUser();
      setUser(currentUser)

      setUsername('')
      setPassword('')

      navigate('/')
      window.scrollTo(0,0)
    } catch (error) {
      // Error can be caused by wrong parameters or lack of Internet connection
      alert(`Error! ${error.message}`);
    }
  };


  return (
    <Header id="login-header" bgd="url('./img/UI/performance-1.jpg')" className="login container flex-column">
        {!user &&
        <Form onSubmit={loginUser} id="login-form" className="login-form">
            <label htmlFor="username" className="required">Username</label>
            <input
                id="username"
                className="required"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                required
            />
            <label htmlFor="password" className="required">Password</label>
            <input
                id="password"
                className="required"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                type="password"
                required
            />
            <button type="submit" className="green">Log In</button>

            <Link to="/reset-password">Forgot password?</Link>
        </Form>}

        {user && <h1>You are already logged in...</h1>}
    </Header>
  );
};

LoginPage.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  user: PropTypes.object
};