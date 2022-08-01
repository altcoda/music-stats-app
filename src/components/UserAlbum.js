import { Link } from 'react-router-dom';
import './Album.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { deleteAlbum } from '../utils/crud';


export const UserAlbum = ({album}) => {

    const id = album.id;

    const onDelete = () => {
        deleteAlbum(id)
    }

    return (
        <div id={id} className="flex-column album">
            <img src={album.image ? album.image[3]['#text'] : null} alt="" />
            <Link to={`/albums/${album.mbid}`}>
                <h2>{album.name && album.name}</h2>
            </Link>
            <Link to={`/artist/${album.artist}`}>
                <h3>{album.artist && album.artist.name}</h3>
            </Link>
            {/* TODO:check if it's their album */}
            <div className="row">
                <button className="edit">
                    <Link to={`/albums/unique/edit/${id}`}><FaEdit /></Link>
                </button>
                <button onClick={onDelete} className="delete"><FaTrashAlt /></button>
            </div>
        </div>
    );
}
