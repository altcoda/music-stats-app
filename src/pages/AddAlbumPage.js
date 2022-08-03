import { AddAlbum } from '../components/AddAlbum';
import { Header } from '../components/Header';


export const AddAlbumPage = () => {
    return(
        <Header bgd="url(/img/UI/music-running-1.jpg)">
            <div className="container">
                <AddAlbum />
            </div>
        </Header>
    )
}
