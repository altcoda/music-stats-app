import { Fragment, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { editUser, getUser } from '../utils/crud';
import { getAge } from '../utils/global';
import './ProfilePage.css';


export const ProfilePage = (props) => {

    const {pathname} = useLocation();
    const id = pathname.split('/').pop();
    const [user, setUser] = useState({});
    const [age, setAge] = useState(null);

    useEffect(() => {
        const initUser = async () => {
            const userData = await getUser(id);
            console.log('userdata', userData)
            setUser(userData)
            console.log('user', user)
            setAge((user && user.birthdate) && getAge(user.birthdate.iso))
        }
        initUser()
    },[])

    const handleClick = (e) => {
        const avatar = user && user.avatar;
        editUser({avatar})
    }

    return (
        <Fragment>
        {user &&
            <div className="flex-column profile">
                <Header id="profile-header" bgd={user.headerImage && `url('${user.headerImage.url}')`}>
                    {user.avatar && <img onClick={handleClick} src={user.avatar.url} alt="" className="icon" />}
                </Header>
                <div className="description">
                    <b className="username">{user.username}</b>
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
