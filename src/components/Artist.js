import './Albums.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getArtist } from '../utils/crud';
import { parseHTML } from '../utils/global';


export const Artist = () => {

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

    return (artist &&
        <div id="artist" className="artist two-col">
            <div className="left">
                <img src={artist.image && artist.image[3]['#text']} alt="" />
                <h1><b className="albumName">{artist.name}</b></h1>
                {artist.bio &&
                <section id="summary" className="summary">
                    <p dangerouslySetInnerHTML={parseHTML(artist.bio.summary)} />
                </section>}
            </div>
            <div className="right">
                {artist.tags &&
                    <section id="tags" className="tags">
                        <ul>
                            {artist.tags.tag.map(tag => <li key={tag.name} className="tag">{tag.name}</li>)}
                        </ul>
                    </section>}
                
                {artist.bio &&
                <section id="bio" className="bio">
                    <p dangerouslySetInnerHTML={parseHTML(
                            artist.bio.content
                            .split(' ')
                            .splice(0,500)
                            .join(' ')
                            .concat(`... <a href=${artist && artist.url} target="_blank" rel="noopener noreferrer">Read more on last.fm</a>`)
                        )}
                    />
                </section>}
            </div>
        </div>
    );
}
