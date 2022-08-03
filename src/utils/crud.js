import axios from 'axios';
import Parse from 'parse/dist/parse.min.js';


const API_PATH = {
    ALBUM: `/2.0/?method=album.getinfo&api_key=${process.env.REACT_APP_LAST_FM_API_KEY}&format=json`,
    ALBUMS: `/2.0/?method=tag.gettopalbums&api_key=${process.env.REACT_APP_LAST_FM_API_KEY}&format=json`,
    ARTIST: `/2.0/?method=artist.getinfo&api_key=${process.env.REACT_APP_LAST_FM_API_KEY}&format=json`
}


const getHeaders = (options) => {
    return {
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
        "crossDomain": true,
        ...options
    }
}

export const getResponse = async({url, query}, headers) => {
    return await axios.get(
        [ process.env.REACT_APP_LAST_FM_API_URL, url, query ].join(''),
        getHeaders(headers)
    )
    .then(res => res.data)
}


export const getArtist = async(artistName) => getResponse({url: API_PATH.ARTIST + `&artist=${artistName}`})

export const getAlbums = async(query) => {
    const url = API_PATH.ALBUMS + `&tag=${query.tag}&page=${query.page}`;

    const res = getResponse({url, query})
    .then(data => {
        const pageCount = data.albums['@attr'].totalPages;
        const albums = data.albums.album;
        return {albums, pageCount}
    })
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


export const editAlbum = async(id, { name, artist, description, tags, release_date, cover }) => {
    const album = await new Parse.Query('Album');

    album.get(id)
    .then((album) => {
        album.set('name', name);
        album.set('artist', artist);
        album.set('description', description);
        album.set('tags', tags);
        album.set('release_date', release_date);
        album.set('cover', cover);
        album.save();
    }, (err) => {
        alert('Failed to update. Error:' + err.message)
    });
}


export const deleteAlbum = async(id) => {
    const album = await new Parse.Query('Album');

    album.get(id)
    .then((album) => {
    album.destroy().then((album) => {
        document.getElementById(id).remove()
    }, (err) => {
        alert('Failed to delete. Error:' + err.message)
    })
    }, (err) => {
        alert('Object wasn\'t found.')
        console.log(err.message)
    });;
}


export const getUserAlbum = async(id) => {
    const Album = await new Parse.Query('Album');

    const album = Album.get(id)
    .then((album) => {
        const name = album.get('name') !== undefined ? album.get('name') : null;
        const artist = album.get('artist') !== undefined ? album.get('artist') : null;
        const cover = album.get('cover') !== undefined ? album.get('cover') : null;
        const release_date = album.get('release_date') !== undefined ? album.get('release_date') : null;
        const tags = album.get('tags') !== undefined ? album.get('tags') : null;
        const description = album.get('description') !== undefined ? album.get('description') : null;
        
        return {
            id: album.id,
            name,
            artist,
            cover,
            release_date,
            tags,
            description
        };
    }, (err) => {
        console.log(err.message)
    });

    return album
}


export const getUserAlbums = async() => {
    const album = await new Parse.Query('Album');
    const count = await album.count();

    const albums = await album.map(album => {
        const name = album.get('name') !== undefined ? album.get('name') : null;
        const artist = album.get('artist') !== undefined ? album.get('artist') : null;
        const cover = album.get('cover') !== undefined ? album.get('cover') : null;
        const release_date = album.get('release_date') !== undefined ? album.get('release_date') : null;
        const tags = album.get('tags') !== undefined ? album.get('tags') : null;
        const description = album.get('description') !== undefined ? album.get('description') : null;
        
        return {
            id: album.id,
            name,
            artist,
            cover,
            release_date,
            tags,
            description
        };
    })

    return { albums: Array.from(albums), count }
}
