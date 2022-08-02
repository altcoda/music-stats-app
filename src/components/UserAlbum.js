import { Link } from 'react-router-dom';
import './UserAlbum.css';
import './Album.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { deleteAlbum } from '../utils/crud';


export const UserAlbum = ({album}) => {

    // TODO: only show edit/delete to author, edit links, edit page
    const onDelete = () => {
        deleteAlbum(album.id)
        document.getElementById(album.id).remove()
    }

    return (
        <div id={album.id} className="flex-column album user-album">
            <img src={album.cover ? album.cover['_url'] : null} alt={`${album.name} cover`} />
            <h2>{album.name && album.name}</h2>
            <h3>{album.artist && album.artist}</h3>
            <p>{album.description && album.description}</p>
            <div className="row controls">
                <button className="edit">
                    <Link to={`/albums/user/edit/${album.id}`}><FaEdit /></Link>
                </button>
                <button onClick={onDelete} className="delete"><FaTrashAlt /></button>
            </div>
        </div>
    );
}
