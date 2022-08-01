import './Navbar.css';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';
import { logoutUser } from '../utils/users';


export const Navbar = () => {
  const { user, setUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const toggleUserMenu = (e) => Array.from(document.querySelector('#user-nav > ul').querySelectorAll('.dropdown')).map((li) => li.classList.toggle('hidden'));

  const toggleAlbumsMenu = (e) => Array.from(document.querySelector('.albums-nav').querySelectorAll('.dropdown')).map((li) => li.classList.toggle('hidden'));

  const onUserLogout = (e) => {
    logoutUser();
    toggleUserMenu()
    setUser(null);
    navigate('/');
  };

  return (
    <div id="navbar" className="navbar">
      <nav id="primary-nav" className="primary-nav" aria-label="primary">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        
        <ul onMouseLeave={toggleAlbumsMenu} id="albums-nav" className="albums-nav" aria-label="albums">
            <li style={{height: '70px'}} onClick={toggleAlbumsMenu}>
                Albums
            </li>
            <li onClick={toggleAlbumsMenu} className="dropdown hidden">
                <Link to="/albums">Albums</Link>
            </li>
            {user &&
            <li onClick={toggleAlbumsMenu} className="dropdown hidden">
                <Link to="/albums/add">Add Album</Link>
            </li>}
        </ul>
      </nav>

      {user && (
        <nav onMouseLeave={toggleUserMenu} id="user-nav" className="user-nav" aria-label="user">
          <ul>
            <li className="icon" onClick={toggleUserMenu}>
              <img src={user.avatar && user.avatar.url} alt="user icon" />
            </li>
            <li className="dropdown hidden" onClick={toggleUserMenu}>
              <Link to={`/profile/${user.objectId}`}>Profile</Link>
            </li>
            <li className="dropdown hidden" onClick={onUserLogout}>
              Logout
            </li>
          </ul>
        </nav>
      )}

      {!user && (
        <nav id="guest-nav" className="guest-nav" aria-label="guest">
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
      )}
    </div>
  );
};
