import axios from 'axios';
import Parse from 'parse/dist/parse.min.js';


const API_PATH = {
    ALBUM: `/2.0/?method=album.getinfo&api_key=${process.env.REACT_APP_LAST_FM_API_KEY}&format=json`,
    ALBUMS: `/2.0/?method=tag.gettopalbums&api_key=${process.env.REACT_APP_LAST_FM_API_KEY}&format=json`,
    ARTIST: `/2.0/?method=artist.getinfo&api_key=${process.env.REACT_APP_LAST_FM_API_KEY}&format=json`
}


export const getResponse = async({url, query}) => {
    return await axios.get(
        [ process.env.REACT_APP_LAST_FM_API_URL, url, query ].join(''), 
        { crossDomain: true }
    )
    .then(res => res.data)
}


export const getAlbums = async(query) => {
    const url = API_PATH.ALBUMS + `&tag=${query.tag}&page=${query.page}`;

    const res = getResponse({url, query})
    .then(data => data.albums.album)
    .catch((err) => console.log(err))

    return res
}


export const getAlbum = async(id) => {
    const res = getResponse({url: API_PATH.ALBUM + `&mbid=${id}`})
    .then(data => data.album)
    .catch((err) => console.log(err))

    return res
}


export const getArtist = async(artistName) => getResponse({url: API_PATH.ARTIST + `&artist=${artistName}`})


export const addAlbum = async(data) => {
    const { name, artist, description, tags, release_date, cover } = data;
    const album = new Parse.Object('Album');

    album.set('name', name);
    album.set('artist', artist);
    album.set('description', description);
    album.set('tags', tags);
    album.set('release_date', release_date);
    album.set('cover', cover);

    try {
        const result = await album.save();
        alert(`Album ${result.get('name')} by ${result.get('artist')} added successfully!`);
    } catch(err) {
        alert('Failed to add album')
        console.log(err.message)
    }
}

// TODO
export const editAlbum = async(id, data) => {
    const Album = Parse.Object.extend("Album");
    const album = new Album();
    
    const res = album.get(id)
        .then((album) => {
        // album.set('name', 'Midnight')
        // album.save();
        }, (err) => {
            alert('Failed to update')
            console.log(err.message)
        });
    
    return res;
}

// TODO
export const deleteAlbum = async(id) => {
    const Album = Parse.Object.extend("Album");
    const album = new Parse.Query(Album);

    album.get(id)
    .then((obj) => {
    // The object was retrieved successfully and it is ready to update.
    obj.destroy().then((obj) => {
        // The object was deleted
    }, (err) => {
        alert('Failed to delete.')
        console.log(err.message)
    })
    }, (err) => {
        alert('Object wasn\'t found.')
        console.log(err.message)
    });;
}

// TODO
export const getUniqueAlbums = async() => {
    const Album = Parse.Object.extend("Album");
    const albums = new Parse.Query(Album);

}
