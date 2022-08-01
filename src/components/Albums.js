import { Fragment, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalProvider';
import { PropTypes } from 'prop-types';
import { Album } from './Album';
import './Albums.css';
import { getAlbums } from '../utils/crud';
import { Search } from './Search';


export const Albums = ({className}) => {

    const {albumsList, setAlbumsList} = useContext(GlobalContext);
    const {query} = useContext(GlobalContext);

    useEffect(() => {
        const initAlbums = async () => {
            const albums = await getAlbums(query);
            setAlbumsList(albums);
        }

        initAlbums();
    }, [query])

    return (
        <Fragment>
            <Search />
            <ul className={className && className}>
                {albumsList && albumsList
                    .filter(album => Boolean(album.mbid))
                    .filter(album => album.name.toLowerCase().includes(query.search.toLowerCase()) || album.artist.name.toLowerCase().includes(query.search.toLowerCase()))
                    .map((album, i) => 
                        <li key={i}><Album album={album} /></li>
                )}
            </ul>
        </Fragment>
    );
}

//.filter(album => album.artist.name === query.seach || album.name === query.search)

Albums.propTypes = {
    className: PropTypes.string
};
