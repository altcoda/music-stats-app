import axios from 'axios';
import Parse from 'parse/dist/parse.min.js';


const API_PATH = {
    ALBUM: `/2.0/?method=album.getinfo&api_key=${process.env.REACT_APP_LAST_FM_API_KEY}&format=json`,
    ALBUMS: `/2.0/?method=tag.gettopalbums&api_key=${process.env.REACT_APP_LAST_FM_API_KEY}&format=json`,
    ARTIST: `/2.0/?method=artist.getinfo&api_key=${process.env.REACT_APP_LAST_FM_API_KEY}&format=json`
}


export const getHeaders = (options) => {
    return {
        "X-Parse-Application-Id": process.env.REACT_APP_APP_ID,
        'X-Parse-REST-API-Key': process.env.REACT_APP_REST_API_KEY,
        "Content-Type": "application/json",
        "crossDomain": true,
        ...options
    }
}

export const getResponse = async({url, query}, headers) => {
    return await axios.get(
        [ process.env.REACT_APP_LAST_FM_API_URL, url, query ].join(''),
        getHeaders()
    )
    .then(res => res.data)
}


export const getArtist = async(artistName) => getResponse({url: API_PATH.ARTIST + `&artist=${artistName}`})

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


export const addAlbum = async({ name, artist, description, tags, release_date, cover }) => {
    
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
        alert('Failed to add album. Error:' + err.message)
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
            alert('Failed to update. Error:' + err.message)
        });
    
    return res;
}


export const deleteAlbum = async(id) => {
    const album = await new Parse.Query('Album');

    album.get(id)
    .then((obj) => {
    // The object was retrieved successfully and it is ready to update.
    obj.destroy().then((obj) => {
        // The object was deleted
    }, (err) => {
        alert('Failed to delete. Error:' + err.message)
    })
    }, (err) => {
        alert('Object wasn\'t found.')
        console.log(err.message)
    });;
}


export const getUserAlbums = async() => {
    const album = await new Parse.Query('Album');
    const count = await album.count();

    const albums = await album.map(album => {
        const name = album.get('name') !== undefined ? album.get('name') : null;
        const artist = album.get('artist') !== undefined ? album.get('artist') : null;
        const cover = album.get('cover') !== undefined ? album.get('cover') : null;
        const description = album.get('description') !== undefined ? album.get('description') : null;
        
        return {
            id: album.id,
            name,
            artist,
            cover,
            description
        };
    })

    return { albums: Array.from(albums), count }
}
