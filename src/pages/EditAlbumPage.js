import { useLocation } from 'react-router-dom';
import { AlbumForm } from '../components/AlbumForm'


export const EditAlbumPage = () => {
    const {pathname} = useLocation();
    const albumId = pathname.split('/').pop();
    console.log(albumId)

    return(
        <div id="edit-album" className="edit-album container page">
            <AlbumForm albumId={albumId} actionType="edit" />
        </div>
    )
}