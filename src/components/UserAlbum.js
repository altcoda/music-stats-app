import './UserAlbum.css';
import './Album.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { deleteAlbum } from '../utils/crud';


export const UserAlbum = ({album}) => {

    // TODO: only show edit/delete to author
    const onDelete = () => {
        if (window.confirm('Are you sure you want to delete this album?')) {
            deleteAlbum(album.id)
            document.getElementById(album.id).remove()
        }
    }

    return (
        <div id={album.id} className="flex-column album user-album">
            <img src={album.cover ? album.cover : null} alt={`${album.name} cover`} />
            <h2>{album.name && album.name}</h2>
            <h3>{album.artist && album.artist}</h3>
            <p>{album.description && album.description}</p>
            <div className="row controls">
                <Link to={`/albums/user/edit/${album.id}`}>
                    <button id="edit-button" className="edit"><FaEdit /></button>
                </Link>
                <button id="delete-button" onClick={onDelete} className="delete"><FaTrashAlt /></button>
            </div>
        </div>
    );
}
