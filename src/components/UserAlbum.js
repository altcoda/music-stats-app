import './UserAlbums.css';
import './Album.css';
import { FaEdit, FaRegHeart, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { deleteAlbum } from '../utils/crud';
import { getYear } from '../utils/global';
import { Fragment, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalProvider';


export const UserAlbum = ({album, setAlbumCount}) => {

    const {user, setUser} = useContext(GlobalContext);
    const [isAuthor, setIsAuthor] = useState(false);

    useEffect(() => {
        if(user && album && album.added_by && user.objectId === album.added_by.id) {
            setIsAuthor(true)
        }
    },[user,album])

    const onDelete = () => {
        if (window.confirm('Are you sure you want to delete this album?')) {
            deleteAlbum(album.id)
            setAlbumCount(prevCount => prevCount - 1)
        }
    }

    // TODO: implement like button
    // const onLike = () => {
    //     //likeAlbum(album.id)
    // }

    return (
        <div id={album.id} className="flex-column album user-album">
            <img src={album.cover ? album.cover : null} alt={`${album.name} cover`} />
            <h2>{album.name && album.name} by {album.artist && album.artist}</h2>
            <h3>{album.release_date && getYear(album.release_date)}</h3>
            <p>{album.description && album.description}</p>
            <div className="row more-info">
                {album.tags && album.tags.length > 0 &&
                <section id="tags" className="tags">
                    <ul>
                        {album.tags.map(tag => <li key={tag} className="tag">{tag}</li>)}
                    </ul>
                </section>}
            </div>
            <div className="row controls">
                {/* <button id="like-button" onClick={onLike} className="like"><FaRegHeart /></button> */}
                {isAuthor &&
                <Fragment>
                    <Link to={`/useralbums/edit/${album.id}`}>
                        <button id="edit-button" className="edit"><FaEdit /></button>
                    </Link>
                    <button id="delete-button" onClick={onDelete} className="delete"><FaTrashAlt /></button>
                </Fragment>}
            </div>
        </div>
    );
}
