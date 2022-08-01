import { useEffect, useState } from "react"
import { getUniqueAlbums } from "../utils/crud";


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

    return(
        <div className="container">
            {userAlbums && 
                userAlbums.map(album => <p>{album.description && album.description}</p>)
            }
        </div>
    )
}