import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editAlbum } from '../utils/crud';
import { Form } from './Form';
import { SelectTags } from './Select';


export const EditAlbum = ({album, setAlbum}) => {

    const [tags, setTags] = useState(album.tags);
    const navigate = useNavigate();

    const onEdit = () => {
        try {
            editAlbum(album.id, {...album, release_date: new Date(album.date), tags: tags});
        } catch(err) {
            console.log(err)
        }

        navigate('/useralbums')
    }

    const uploadImage = async(e) => {
        //const file = e.target.files[0];
        setAlbum({...album, cover: e.target.value});
    }

    return (
        <Form id={'edit-album-form'} style={{ width: '400px' }} className="form" onSubmit={onEdit}>
            <label htmlFor="name" className="required">Album Name</label>
            <input
                type="text"
                id="name"
                className="required"
                placeholder="name"
                value={album.name}
                onChange={(e) => setAlbum({...album, name: e.target.value})}
                required
            />

            <label htmlFor="artist" className="required">Album Artist</label>
            <input
                type="text"
                id="artist"
                className="required"
                placeholder="artist"
                value={album.artist}
                onChange={(e) => setAlbum({...album, artist: e.target.value})}
                required
            />
            
            <label htmlFor="description">Description</label>
            <textarea
                style={{minHeight: 0}}
                id="description"
                placeholder="Please, provide a short summary of the album."
                value={album.description}
                onChange={(e) => setAlbum({...album, description: e.target.value})}
            />

            <label htmlFor="release_date">Release Date</label>
            <input
                type="date"
                id="release_date"
                value={album.release_date}
                onChange={(e) => setAlbum({...album, release_date: e.target.value})}
            />
            <SelectTags defaultTags={tags} setTags={setTags} />

            <label htmlFor="cover" className="required">Album Cover</label>
            <input
                type="text"
                id="cover"
                placeholder="image url"
                className="required"
                value={album.cover}
                onChange={uploadImage}
                required
            />

            <button type="submit" id="edit-album-button" className="green">
                Edit album
            </button>
        </Form>
    )
}