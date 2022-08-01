import { useEffect, useState } from "react"
import { getUniqueAlbums } from "../utils/crud";
import { UserAlbum } from "./UserAlbum";


export const UserAlbums = () => {

    const [userAlbums, setUserAlbums] = useState([]);

    useEffect(() => {
        const initAlbums = async() => {
            const albums = await getUniqueAlbums();
            console.log('user albums', albums)
            setUserAlbums(albums)
        }
        initAlbums()
    },[])

    const test = [
        {name: 'Epic 99', artist: 'Link In Park', description: 'haha'},
        {name: 'Epic 10', artist: 'Link In Park', description: 'hahaaaaaa'},
        {name: 'Epic 101', artist: 'Link In Park', description: 'thousands'},
    ];

    return(
        <div className="container">
            <div className="row">
                {test.map(album => <UserAlbum album={album} />)}
            </div>
        </div>
    )
}