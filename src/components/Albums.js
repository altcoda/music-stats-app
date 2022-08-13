import './Albums.css';
import { Fragment, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalProvider';
import { PropTypes } from 'prop-types';
import { Album } from './Album';
import { getAlbums } from '../utils/crud';
import { Search } from './Search';
import { Pagination } from './Pagination';


export const Albums = ({className, limit}) => {
    const {albumsList, setAlbumsList} = useContext(GlobalContext);
    const {query} = useContext(GlobalContext);
    const [pages, setPages] = useState(null);
    const [defaultLimit, setDefaultLimit] = useState(0);
    const [initialised, setInitialised] = useState(false);

    const initAlbums = async () => {
        const {albums, pages, limit} = await getAlbums(query);
        setAlbumsList(albums)
        setPages(pages)
        setDefaultLimit(limit)
    }

    // request again on query change
    useEffect(() => {
        if(!initialised) return
        initAlbums()
    },[query])

    // initial request
    useEffect(() => {
        initAlbums()
        setInitialised(true)
    },[])

    return (
        <Fragment>
            <Fragment>
                <Search />
                <ul id="albums-list" className={className && className}>
                {albumsList && albumsList.filter(album => Boolean(album.mbid))
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
                    .slice(0, limit ? Number(limit) : defaultLimit)
                    .map((album, i) => <li key={i}><Album album={album} /></li>)
                }
                </ul>
                <Pagination pages={pages} />
            </Fragment>
        </Fragment>
    );
}


Albums.propTypes = {
    className: PropTypes.string,
    limit: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};
