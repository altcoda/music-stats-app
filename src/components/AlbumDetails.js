import './AlbumDetails.css';
import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAlbum } from '../utils/crud';
import { getMinutes, parseHTML } from '../utils/global';


export const AlbumDetails = () => {

    const [album, setAlbum] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/').pop();

    useEffect(() => {
        const initDetails = async() => {
            const details = await getAlbum(id);
            setAlbum(details)
        }
        initDetails()
    },[])

    return (
        <div id="details" className="details two-col">
            {album &&
            <Fragment>
                <div className="left">
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

                <div className="right">
                    {album.tags &&
                    <section id="tags" className="tags">
                        <ul>
                            {album.tags.tag.map(tag => <li key={tag.name} className="tag">{tag.name}</li>)}
                        </ul>
                    </section>}
                    {(album.wiki && album.wiki.summary) &&
                    <section id="summary" className="summary">
                        <p dangerouslySetInnerHTML={parseHTML(album.wiki.summary, [' <a href=','... <a href='])} />
                    </section>}
                    {(album.wiki && album.wiki.bio) &&
                    <section id="summary" className="summary">
                        <p dangerouslySetInnerHTML={parseHTML(album.wiki.bio, [' <a href=','... <a href='])} />
                    </section>}
                </div>
            </Fragment>}           
        </div>
    );
}
