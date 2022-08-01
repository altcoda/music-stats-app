import { Link } from 'react-router-dom';
import './Album.css';


export const Album = ({album}) => {
    return (
        <div id={album.mbid} className="flex-column album">
            <img src={album.image ? album.image[3]['#text'] : null} alt="" />
            <Link to={`/albums/${album.mbid}`}>
                <h2>{album.name && album.name}</h2>
            </Link> BY <Link to={`/artist/${album.artist.name}`}>
                <h3>{album.artist && album.artist.name}</h3>
            </Link>
        </div>
    );
}
