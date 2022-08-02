import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAlbum } from '../utils/crud';
import { Form } from './Form';
import { SelectTags } from './Select';


export const AddAlbum = () => {
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(null);
    const [cover, setCover] = useState(null);
    const navigate = useNavigate();
     
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
     
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
     
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    };

    const uploadImage = async(e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        console.log(base64)
        setCover(base64);
    }
    
    const onAddAlbum = () => {
        try {
            addAlbum({ name, artist, description, tags, release_date: date, cover });
        } catch(err) {
            console.log(err)
            return
        }

        navigate('/albums/user/')
    };

    return (
        <Form
            id="add-album-form"
            style={{
                width: '400px'
            }}
            className="form"
            onSubmit={onAddAlbum}
        >
            <label htmlFor="name" className="required">Album Name</label>
            <input
                id="name"
                className="required"
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
            />

            <label htmlFor="artist" className="required">Album Artist</label>
            <input
                id="artist"
                className="required"
                onChange={(e) => setArtist(e.target.value)}
                type="text"
                required
            />
            
            <label htmlFor="description">Description</label>
            <textarea
                style={{minHeight: 0}}
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                type="text"
            />

            <label htmlFor="release_date">Release Date</label>
            <input
                id="release_date"
                onChange={(e) => setDate(e.target.value)}
                type="date"
            />
            
            <SelectTags setTags={setTags} />

            <label htmlFor="cover" className="required">Album Cover</label>
            <input
                id="cover"
                className="required"
                onChange={uploadImage}
                type="file"
                required
            />

            <button type="submit" id="add-album-button" className="green">
                Add Album
            </button>
        </Form>
    );
};
