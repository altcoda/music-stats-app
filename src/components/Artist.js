import './Albums.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getArtist } from '../utils/crud';
import { parseHTML } from '../utils/global';


// write later
export const Artist = (props) => {

    const [artist, setArtist] = useState({});
    const {pathname} = useLocation();
    const artistName = pathname.split('/').pop();

    useEffect(() => {
        const initArtist = async() => {
            const {artist} = await getArtist(artistName);
            setArtist(artist)
        }
        initArtist()
    },[])

    console.log(artist.bio)

    return (artist &&
        <div id="artist" className="artist two-col">
            <div class="left">
                <img src={artist.image && artist.image[3]['#text']} alt="" />
                <h1><b className="albumName">{artist.name}</b></h1>
                {artist.bio && <section id="summary" className="summary">
                    <p dangerouslySetInnerHTML={parseHTML(artist.bio.summary)} />
                </section>}
            </div>
            <div class="right">

            </div>
        </div>
    );
}
