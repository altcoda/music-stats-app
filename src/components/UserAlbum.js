import './UserAlbums.css';
import './Album.css';
import { FaEdit, FaRegHeart, FaHeart, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { deleteAlbum, getLikedAlbums, likeAlbum } from '../utils/crud';
import { getYear } from '../utils/global';
import { Fragment, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalProvider';


export const UserAlbum = ({album, setAlbumCount}) => {

    const {user} = useContext(GlobalContext);
    const [isAuthor, setIsAuthor] = useState(false);
    const [likedAlbums, setLikedAlbums] = useState([]);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if(user && album && album.added_by && user.objectId === album.added_by.id) {
            setIsAuthor(true)
        }
        if(user) {
            const initLikedAlbums = async(userId) => {
                const data = await getLikedAlbums(userId);
                setLikedAlbums(data)
            }
            initLikedAlbums(user.objectId)
        }
    },[user, album])

    useEffect(() => {
        if(likedAlbums.some(a => a.id === album.id)) {
            setIsLiked(true)
        }
    },[likedAlbums])

    const onDelete = () => {
        if (window.confirm('Are you sure you want to delete this album?')) {
            deleteAlbum(album.id)
            setAlbumCount(prevCount => prevCount - 1)
        }
    }

    //like or dislike
    const onLike = () => {
        likeAlbum(album.id, user.objectId)
        setIsLiked(prevState => !prevState)
    }

    return (album &&
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
                {!isAuthor && <button id={`like-button-${album.id}`} onClick={onLike} className={`like ${isLiked ? 'liked' : 'not-liked'}`}>{isLiked ? <FaHeart /> : <FaRegHeart />}</button>}
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
