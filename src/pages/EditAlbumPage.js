import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { EditAlbumForm } from '../components/Forms/EditAlbum';
import { getUserAlbum } from '../utils/crud';


export const EditAlbumPage = () => {
    
    const [album, setAlbum] = useState({});
    const {pathname} = useLocation();
    const albumId = pathname.split('/').pop();

    useEffect(() => {
        const initAlbum = async() => {
            const data = await getUserAlbum(albumId);
            setAlbum(data)
        }
        initAlbum()
    },[])

    return(
        <div id="edit-album" className="edit-album container page-center">
            <EditAlbumForm album={album} setAlbum={setAlbum} />
        </div>
    )
}