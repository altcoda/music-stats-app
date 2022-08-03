import './UserAlbums.css';
import { Fragment, useContext, useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';
import { getUserAlbums } from '../utils/crud';
import { UserAlbum } from './UserAlbum';


export const UserAlbums = () => {

    const {userAlbums, setUserAlbums} = useContext(GlobalContext);
    const [albumCount, setAlbumCount] = useState(0);

    useEffect(() => {
        const initAlbums = async() => {
            const {albums, count} = await getUserAlbums();
            setAlbumCount(count)
            setUserAlbums(albums)
        }
        initAlbums()
    },[])

    return(
        <div className="user-albums-page container page page-center">
            <Fragment>
                {userAlbums ? 
                <Fragment>
                    <h3>
                        {albumCount > 1 ? 
                        `There are currently ${albumCount} albums ` :
                        `There is currently 1 album `}
                        created by users.
                    </h3>
                    <div id="user-albums" className="user-albums flex-container">
                    {userAlbums.map((album, key) => <UserAlbum key={key} album={album} setAlbumCount={setAlbumCount} />)}
                    </div>
                </Fragment>
                :
                <Fragment>
                    <h1 className="add">No albums. Be the first to add your album!</h1>
                    <div className="add"><Link to='/useralbums/add'><FaPlusCircle /></Link></div>
                </Fragment>}
            </Fragment>
        </div>
    )
}