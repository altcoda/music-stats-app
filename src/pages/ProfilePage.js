import './ProfilePage.css';
import { FaUserEdit } from 'react-icons/fa';
import { Fragment, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { getAge } from '../utils/global';
import { editUser, getCurrentUser, getUser } from '../utils/users';
import { Form } from '../components/Forms/Form';
import { IconStyleSwitch } from '../components/UI/IconStyleSwitch';


export const ProfilePage = () => {

    const {pathname} = useLocation();
    const id = pathname.split('/').pop();
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState({});
    const [icon, setIcon] = useState('');
    const [cover, setCover] = useState('');

    useEffect(() => {
        const initUser = async () => {
            const data = await getUser(id);
            const currentUser = await getCurrentUser();
            setUser(data)
            if(id === currentUser.objectId) {
                setIsAuth(true)
            }
        }
        initUser()
    },[])

    const toggleEditIconButton = () => {
        document.getElementById('icon-edit-overlay').classList.toggle('hidden');
    }

    const onEditIcon = (e) => {
        e.preventDefault()
        document.getElementById('edit-icon').classList.toggle('hidden');
    }

    const onIconChange = (e) => {
        setIcon(e.target.value)
    }

    useEffect(() => {
        setUser(prevUser => ({...prevUser, icon: icon}))
    },[icon])

    const onCoverChange = (e) => {
        setCover(e.target.value)
    }
    
    useEffect(() => {
        setUser(prevUser => ({...prevUser, cover: cover}))
    },[cover])

    const onSaveImageSettings = (e) => {
        e.preventDefault()

        if(user && id) {
            if(cover !== '') {
                editUser(id, {cover: cover})
            }
    
            if(icon !== '') {
                editUser(id, {icon: icon})
            }
        }

        document.getElementById('edit-icon').classList.toggle('hidden');
    }

    return (
        <Fragment>
            {user &&
                <div className="flex-column profile">
                    <Header id="profile-header" bgd={user.cover && `url('${user.cover}')`} />
                    <div className="flex-column user-info">

                    {!isAuth &&
                    <Fragment>
                        {user.icon && <img src={user.icon} alt="" className={`icon ${user.iconBorderStyle}`} />}
                    </Fragment>}

                    {isAuth &&
                    <Fragment>
                        {user.icon && <FaUserEdit onClick={onEditIcon} id="icon-edit-overlay" className="icon-edit-overlay flex-column hidden" />}
                        
                        <div id="edit-icon" className="edit-icon flex-column hidden">
                            <Form id="edit-images-form" onSubmit={onSaveImageSettings}>
                                <label htmlFor="cover-url">cover url</label>
                                <input id="cover-url" placeholder="cover url" onChange={onCoverChange} />
                                <label htmlFor="icon-url">icon url</label>
                                <input id="icon-url" placeholder="image url" onChange={onIconChange} />
                                <IconStyleSwitch user={user} userId={id} setUser={setUser} />
                                <button type="submit" className="green">Save</button>
                            </Form>
                        </div>
                        {user.icon && <img onMouseEnter={toggleEditIconButton} onMouseLeave={toggleEditIconButton} onClick={onEditIcon} src={user.icon} alt="" className={`icon ${user.iconBorderStyle}`} />}
                    </Fragment>}

                        <div className="description">
                            <b className="username">{user.username} {isAuth && <FaUserEdit />}</b>
                            {user.description !== '' ? user.description : 'No description has been set.'}
                            
                            {(user && user.birthdate) && <p><b>age:</b> {getAge(user.birthdate)}</p>}
                        </div>
                    </div>
                </div>
            }
            {!user &&
            <p id="register-link" className="register-link">Don't have an account? <Link to="/register">Sign up</Link></p>}
        </Fragment>
        )
};
