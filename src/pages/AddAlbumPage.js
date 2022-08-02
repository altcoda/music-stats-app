import { AlbumForm } from '../components/AlbumForm';
import { Header } from '../components/Header';


export const AddAlbumPage = () => {
    return(
        <Header bgd="url(/img/UI/music-running-1.jpg)">
            <div className="container">
                <AlbumForm actionType="add" />
            </div>
        </Header>
    )
}