import './AlbumDetails.css';
import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAlbum } from '../utils/crud';
import { getMinutes, parseHTML } from '../utils/global';


export const AlbumDetails = () => {

    // useRef isn't working for some reason
    const [album, setAlbum] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/').pop();

    useEffect(() => {
        const initDetails = async() => {
            const details = await getAlbum(id);
            console.log(details)
            setAlbum(details)
        }
        initDetails()
    },[])

    return (
        <div id="details" className="details two-col">
            {album &&
            <Fragment>
                <div class="left">
                    <img src={album.image && album.image[3]['#text']} alt="" />
                    <h1>
                        <b className="albumName">{album.name && album.name}</b> by <b className="artistName">{album.artist && album.artist}</b>
                    </h1>
                    <section>
                        {album.playcount && <p><b>playcount:</b> {album.playcount}</p>}
                    </section>
                    {album.tracks &&
                    <section id="tracks" className="tracks">
                        <ol className="list">
                            {album.tracks.track.map((track, num) => {
                                return(
                                    <li key={num}>
                                        {String(++num).padStart(2, '0')}. {track.name}{track.duration && ` (${getMinutes(track.duration)})`}
                                    </li>
                                )
                            })}
                        </ol>
                    </section>}
                </div>

                <div class="right">
                    {album.tags &&
                    <section id="tags" className="tags">
                        <ul>
                            {album.tags.tag.map(tag => <li key={tag.name} class="tag">{tag.name}</li>)}
                        </ul>
                    </section>}
                    {(album.wiki && album.wiki.summary) && <section id="summary" className="summary">
                        <p dangerouslySetInnerHTML={parseHTML(album.wiki.summary, [' <a href=','... <a href='])} />
                    </section>}
                </div>
            </Fragment>}           
        </div>
    );
}
