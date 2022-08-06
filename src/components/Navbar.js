import './Navbar.css';
import { Fragment, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';
import { logoutUser } from '../utils/users';


export const Navbar = () => {
  const {user, setUser} = useContext(GlobalContext);
  const navigate = useNavigate();

  const toggleUserMenu = (e) => Array.from(document.querySelector('#user-nav > ul').querySelectorAll('.dropdown')).map((li) => li.classList.toggle('hidden'));

  const toggleAlbumsMenu = (e) => Array.from(document.querySelector('.albums-nav').querySelectorAll('.dropdown')).map((li) => li.classList.toggle('hidden'));

  const onUserLogout = (e) => {
    logoutUser()
    toggleUserMenu()
    setUser(null)
    navigate('/')
    window.scrollTo(0,0)
  };

  return (
    <div id="navbar" className="navbar">
      <nav id="primary-nav" className="primary-nav" aria-label="primary">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        
        <ul onMouseEnter={toggleAlbumsMenu} onMouseLeave={toggleAlbumsMenu} id="albums-nav" className="albums-nav" aria-label="albums">
            <li style={{height: '70px'}} onClick={toggleAlbumsMenu}>
                Albums
            </li>
            <li className="dropdown hidden">
                <Link to="/albums">All Albums</Link>
            </li>
            {user &&
            <Fragment>
            <li className="dropdown hidden">
                <Link to="/useralbums">
                  User Albums
                </Link>
            </li>
            <li className="dropdown hidden">
                <Link to="/useralbums/add">
                  Add Album
                </Link>
            </li>
            </Fragment>}
        </ul>
      </nav>

      {user && (
        <nav onMouseEnter={toggleUserMenu} onMouseLeave={toggleUserMenu} id="user-nav" className="user-nav" aria-label="user">
          <ul>
            <li className="icon" onClick={toggleUserMenu}>
              <img src={user.icon && user.icon} alt="user icon" />
            </li>
            <li className="dropdown hidden">
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
