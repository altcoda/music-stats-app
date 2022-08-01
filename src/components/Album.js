import './Album.css';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';


export const Album = ({album}) => {
    return (
        <div id={album.mbid} className="flex-column album">
            <img src={album.image ? album.image[3]['#text'] : null} alt="" />
            <Link to={album && `/albums/${album.mbid}`}>
                <h2>{album.name && album.name}</h2>
            </Link> 
            <Link to={album.artist && `/artist/${album.artist.name}`}>
                <h3>{album.artist && album.artist.name}</h3>
            </Link>
        </div>
    );
}

Album.propTypes = {
    album: PropTypes.object.isRequired,
};
