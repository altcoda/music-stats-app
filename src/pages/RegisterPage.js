import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../components/Forms/Form';
import { Header } from '../components/Header';
import { GlobalContext } from '../context/GlobalProvider';
import { getCurrentUser } from '../utils/users';
import Parse from 'parse/dist/parse.min.js';


export const RegisterPage = () => {

  const { setUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email =  document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(username.length < 4) {
        alert('Username must be at least 4 characters long.');
        return;
    }

    let newUser = new Parse.User();

    newUser.set('username', username);
    newUser.set('email', email);
    newUser.set('password', password);

    try {
      newUser = await newUser.save();
      await Parse.User.logIn(username, password);
      const currentUser = await getCurrentUser();
      
      setUser(currentUser)
      navigate('/')
      window.scrollTo(0,0)
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Header id="register-header" bgd="url('/img/UI/concert-1.jpg')" className="container flex-column">
      <Form
        onSubmit={createUser}
        id="register-form"
        className="form register"
        style={{ maxWidth: '300px' }}
      >
        <label htmlFor="username">Username</label>
        <input id="username" type="text" placeholder="Username" required />
        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="Email" required />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" placeholder="Password" required />
        <button type="submit" id="createButton" className="green">Sign Up</button>
      </Form>
    </Header>
  );
};