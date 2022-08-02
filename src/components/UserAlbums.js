import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';
import { getUserAlbums } from '../utils/crud';
import { UserAlbum } from './UserAlbum';


export const UserAlbums = () => {

    const {userAlbums, setUserAlbums} = useContext(GlobalContext);

    useEffect(() => {
        const initAlbums = async() => {
            const {albums} = await getUserAlbums();
            setUserAlbums(albums)
        }
        initAlbums()
    },[])

    return(
        <div className="container page">
            <div className="row">
                {userAlbums ? userAlbums.map(album => <UserAlbum key={album.objectId} album={album} />) :
                    <div>
                        <h1>No albums. Be the first to add your album from <Link to="/albums/add">here!</Link></h1>
                    </div>}
            </div>
        </div>
    )
}