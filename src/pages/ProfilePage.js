import './ProfilePage.css';
import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { getAge, getDate } from '../utils/global';
import { getCurrentUser, getUser } from '../utils/users';
import { LikedAlbums } from '../components/LikedAlbums';
import { EditUserInfo } from '../components/EditUserInfo';
import { EditImageSettings } from '../components/EditImageSettings';
import { getLikedAlbums } from '../utils/crud';


export const ProfilePage = () => {

    const {pathname} = useLocation();
    const id = pathname.split('/').pop();
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState({});
    const [likedAlbums, setLikedAlbums] = useState([]);
    const [icon, setIcon] = useState('');
    const [cover, setCover] = useState('');
    const [description, setDescription] = useState('');
    const [birthdate, setBirthdate] = useState(null);

    useEffect(() => {
        const initUser = async () => {
            const data = await getUser(id);
            setUser(data)

            const currentUser = await getCurrentUser();
            if(id === currentUser.objectId) {
                setIsAuth(true)
            }
        }
        initUser()
        
        const initLikedAlbums = async(userId) => {
            const data = await getLikedAlbums(userId);
            setLikedAlbums(data)
        }
        initLikedAlbums(id)
    },[])

    useEffect(() => {
        if(user.description) {
            setDescription(user.description)
        }
        if(user.birthdate) {
            setBirthdate(getDate(user.birthdate).YMD)
        }
    },[user])
    
    useEffect(() => {
        setUser(prevUser => ({...prevUser, icon: icon}))
    },[icon])
    
    useEffect(() => {
        setUser(prevUser => ({...prevUser, cover: cover}))
    },[cover])

    return (
        <Fragment>
            {user &&
            <div className="flex-column profile">
                <Header id="profile-header" bgd={user.cover && `url('${user.cover}')`} />
                <div className="flex-column user-info">

                    {(!isAuth && user.icon) && <img src={user.icon} alt="" className={`icon ${user.iconBorderStyle}`} />}

                    {isAuth &&
                    <EditImageSettings
                        user={user}
                        id={id}
                        setUser={setUser}
                        icon={icon}
                        setIcon={setIcon}
                        cover={cover}
                        setCover={setCover}
                    />}

                    <div className="description">
                        {isAuth &&
                        <EditUserInfo
                            user={user}
                            id={id}
                            isAuth={isAuth}
                            birthdate={birthdate}
                            setBirthdate={setBirthdate}
                            description={description}
                            setDescription={setDescription}
                        />}

                        <b className="username">{user.username}</b>
                        {description !== '' ? description : 'No description has been set.'}
                        
                        {birthdate && <p><b>age:</b> {getAge(birthdate)}</p>}
                    </div>

                    {(likedAlbums && likedAlbums.length > 0) &&
                    <section id="liked-albums-section" className="liked-albums-section">
                        <h2>Liked Albums</h2>
                        <LikedAlbums isAuth={isAuth} likedAlbums={likedAlbums} />
                    </section>}
                    
                    {(likedAlbums && likedAlbums.length === 0 && isAuth) &&
                    <h3>You haven't liked any albums yet.</h3>}

                    {(likedAlbums && likedAlbums.length === 0 && !isAuth) &&
                    <h3>This user hasn't liked any albums yet.</h3>}
                </div>
            </div>}
        </Fragment>
    )
};
