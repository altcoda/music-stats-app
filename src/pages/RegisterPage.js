import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../components/Form';
import { Header } from '../components/Header';
import { GlobalContext } from '../context/GlobalProvider';
import { getCurrentUser } from '../utils/users';
import Parse from 'parse/dist/parse.min.js';


export const RegisterPage = (props) => {
  const navigate = useNavigate();
  const { setUser } = useContext(GlobalContext);

  const createUser = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    if(username.length < 4) {
        alert('Username must be at least 4 characters long.')
        return
    }

    let newUser = new Parse.User();

    newUser.set('username', username);
    newUser.set('email', email);
    newUser.set('password', password);

    try {
      newUser = await newUser.save();
      const currentUser = getCurrentUser();
      setUser(currentUser);
      navigate('/');
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
        <label>Username</label>
        <input id="username" type="text" name="username" placeholder="username" required />
        <label>Email</label>
        <input id="email" type="email" name="email" placeholder="email" required />
        <label>Password</label>
        <input id="password" type="password" name="password" placeholder="password" required />
        <button type="submit" id="createButton" className="green">Sign Up</button>
      </Form>
    </Header>
  );
};
