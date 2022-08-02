import './Albums.css';
import { Fragment, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalProvider';
import { PropTypes } from 'prop-types';
import { Album } from './Album';
import { getAlbums } from '../utils/crud';
import { Search } from './Search';
import { Pagination } from './Pagination';


export const Albums = ({className, limit}) => {

    const {albumsList, setAlbumsList} = useContext(GlobalContext);
    const {query, setQuery} = useContext(GlobalContext);

    useEffect(() => {
        const initAlbums = async () => {
            //const {albums, pages} = await getAlbums(query);
            //console.log(albums)
            //setAlbumsList(albums);
            //setQuery({...query, pages: pages})
        }

        initAlbums();
    }, [query])

    return (
        <Fragment>
            <Search />
            <ul className={className && className}>
            {albumsList && albumsList
                .filter(album => Boolean(album.mbid))
                .filter(album =>
                    query.search ?
                    (
                        album.name.toLowerCase()
                        .includes(query.search.toLowerCase()) ||
                        album.artist.name.toLowerCase()
                        .includes(query.search.toLowerCase())
                    )
                    : album
                )
                .slice(0,  limit ? limit : albumsList.length - 3)
                .map((album, i) => <li key={i}><Album album={album} /></li>)}
            </ul>
            <Pagination />
        </Fragment>
    );
}


Albums.propTypes = {
    className: PropTypes.string
};
