import { UserAlbum } from './UserAlbum';


export const LikedAlbums = ({likedAlbums}) => {
    return(
        <div id="liked-albums" className="user-albums liked-albums flex-container">
            {likedAlbums.map((album, key) => <UserAlbum key={key} album={album} />)}
        </div>
    )
}
