import axios from 'axios';
import Parse from 'parse/dist/parse.min.js';
import { User } from 'parse';
import { getCurrentUser } from './users';


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
        return {
            albums: data.albums.album,
            pages: data.albums['@attr'].totalPages,
            limit: data.albums['@attr'].perPage
        }
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

const albumProps = ['name', 'artist', 'cover', 'release_date', 'tags', 'description'];

export const addAlbum = async(data) => {

    const album = new Parse.Object('Album');
    const currentUser = await getCurrentUser();

    album.set('added_by', new User({id:currentUser.objectId}).toPointer());
    Object.keys(data).forEach((prop) => {
        album.set(prop, data[prop])
    })

    try {
        const result = await album.save();
        alert(`Album ${result.get('name')} by ${result.get('artist')} added successfully!`);
    } catch(err) {
        alert('Failed to add album. Error:' + err.message)
    }
}


export const editAlbum = async(id, data) => {
    const album = await new Parse.Query('Album');

    album.get(id)
    .then((album) => {
        Object.keys(data).forEach((prop) => {
            album.set(prop, data[prop])  
        })
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
        const data = {};

        data.added_by = album.get('added_by') !== undefined ? album.get('added_by') : null; 
        albumProps.forEach((prop) => {
            data[prop] = album.get(prop) !== undefined ? album.get(prop) : null;
        })

        return {...data, id: album.id}
    }, (err) => {
        console.log(err.message)
    });

    return album
}


export const getUserAlbums = async() => {
    const album = await new Parse.Query('Album');
    const count = await album.count();

    const albums = await album.map(album => {
        const data = {};

        data.added_by = album.get('added_by') !== undefined ? album.get('added_by') : null; 
        albumProps.forEach((prop) => {
            data[prop] = album.get(prop) !== undefined ? album.get(prop) : null;  
        })

        return {...data, id: album.id}
    })

    return { albums, count }
}
