import { Link } from 'react-router-dom';
import './Album.css';


export const UserAlbum = ({album}) => {
    return (
        <div id={album.id} className="flex-column album">
            <img src={album.image ? album.image[3]['#text'] : null} alt="" />
            <Link to={`/albums/${album.mbid}`}>
                <h2>{album.name && album.name}</h2>
            </Link>
            <Link to={`/artist/${album.artist}`}>
                <h3>{album.artist && album.artist.name}</h3>
            </Link>
        </div>
    );
}
