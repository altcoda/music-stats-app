import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../utils/users';
import './ProfilePage.css';


export const ProfilePage = (props) => {
  const user = getCurrentUser();

  return (
    <Fragment>
    {user &&
        <div className="flex-column profile">
            <header>
                {user.avatar && <img src={user.avatar.url} alt="" className="icon" />}
            </header>
            <div className="description">
                <b className="username">{user.username}</b>
                {user.description !== '' ? user.description : 'No description has been set.'}
                
                {user.age && <p><b>age:</b> {user.age}</p>}
            </div>
        </div>
    }
    {!user &&
    <p id="register-link" className="register-link">Don't have an account? <Link to="/register">Sign up</Link></p>}
    </Fragment>
    )
};
