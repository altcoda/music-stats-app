import './ProfilePage.css';
import { FaUserEdit } from 'react-icons/fa';
import { Fragment, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { getAge } from '../utils/global';
import { editUser, getUser } from '../utils/users';


export const ProfilePage = () => {

    const {pathname} = useLocation();
    const id = pathname.split('/').pop();
    const [user, setUser] = useState({});
    const [age, setAge] = useState(null);

    useEffect(() => {
        const initUser = async () => {
            const userData = await getUser(id);
            setUser(userData)
            if(user && user.birthdate) {
                setAge(getAge(user.birthdate.iso))
            }
        }
        initUser()
    },[])

    // TODO: finish this
    const handleClick = () => {
        editUser({icon: user.icon})
    }

    return (
        <Fragment>
        {user &&
            <div className="flex-column profile">
                <Header id="profile-header" bgd={user.coverImage && `url('${user.coverImage}')`}>
                    {user.icon && <img onClick={handleClick} src={user.icon} alt="" className="icon" />}
                </Header>
                <div className="description">
                    <b className="username">{user.username} <FaUserEdit /></b>
                    {user.description !== '' ? user.description : 'No description has been set.'}
                    
                    {age && <p><b>age:</b> {age}</p>}
                </div>
            </div>
        }
        {!user &&
        <p id="register-link" className="register-link">Don't have an account? <Link to="/register">Sign up</Link></p>}
        </Fragment>
        )
};
