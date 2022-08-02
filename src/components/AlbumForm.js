import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAlbum, editAlbum } from '../utils/crud';
import { Form } from './Form';
import { SelectTags } from './Select';


export const AlbumForm = ({albumId, actionType}) => {
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(null);
    const [cover, setCover] = useState(null);
    const navigate = useNavigate();

    const actions = {
        add: () => {
            try {
                addAlbum({ name, artist, description, tags, release_date: new Date(date), cover });
            } catch(err) {
                console.log(err)
                return
            }
    
            navigate('/albums/user/')
        },
        edit: () => {
            try {
                editAlbum(albumId, { name, artist, description, tags, release_date: new Date(date), cover });
            } catch(err) {
                console.log(err)
                return
            }
    
            navigate('/albums/user/')
        }
    }

    const uploadImage = async(e) => {
        //const file = e.target.files[0];
        setCover(e.target.value);
    }


    return (
        <Form id={`${actions[actionType]}-album-form`} style={{ width: '400px' }} className="form" onSubmit={actions[actionType]}>
            <label htmlFor="name" className="required">Album Name</label>
            <input
                id="name"
                className="required"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
            />

            <label htmlFor="artist" className="required">Album Artist</label>
            <input
                id="artist"
                className="required"
                placeholder="artist"
                onChange={(e) => setArtist(e.target.value)}
                type="text"
                required
            />
            
            <label htmlFor="description">Description</label>
            <textarea
                style={{minHeight: 0}}
                id="description"
                placeholder="Please, provide a short summary of the album."
                onChange={(e) => setDescription(e.target.value)}
                type="text"
            />

            <label htmlFor="release_date">Release Date</label>
            <input
                id="release_date"
                placeholder="release date"
                onChange={(e) => setDate(e.target.value)}
                type="date"
            />
            
            <SelectTags setTags={setTags} />

            <label htmlFor="cover" className="required">Album Cover</label>
            <input
                id="cover"
                placeholder="image url"
                className="required"
                onChange={uploadImage}
                type="text"
                required
            />

            <button type="submit" id="add-album-button" className="green">
                {actionType} album
            </button>
        </Form>
    )
}