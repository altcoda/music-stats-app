import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editAlbum } from '../../utils/crud';
import { parseDateForInput, parseInputDate } from '../../utils/global';
import { Form } from './Form';
import { SelectTags } from '../UI/Select';


export const EditAlbumForm = ({album}) => {

    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [cover, setCover] = useState('');
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(null);
    const navigate = useNavigate();

    useEffect(() => { 
        setName(album.name)
        setArtist(album.artist)
        setCover(album.cover)
        setDescription(album.description)
        setDate(parseDateForInput(album.release_date))
    },[album])

    const onEdit = () => {
        try {
            editAlbum(album.id, {
                name,
                artist,
                cover,
                tags: tags,
                description,
                release_date: parseInputDate(date)
            });
        } catch(err) {
            console.log(err)
        }

        navigate('/useralbums')
    }

    return (
        <Form id="edit-album-form" style={{ width: '400px' }} className="form edit-form" onSubmit={onEdit}>
            <label htmlFor="name" className="required">Album Name</label>
            <input
                type="text"
                id="name"
                className="required"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <label htmlFor="artist" className="required">Album Artist</label>
            <input
                type="text"
                id="artist"
                className="required"
                placeholder="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
            />
            
            <label htmlFor="description">Description</label>
            <textarea
                style={{minHeight: 0}}
                id="description"
                placeholder="Please, provide a short summary of the album."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor="release_date">Release Date</label>
            <input
                type="date"
                id="release_date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            {album.tags && <SelectTags defaultTags={album.tags} setTags={setTags} />}

            <label htmlFor="cover" className="required">Album Cover</label>
            <input
                type="text"
                id="cover"
                placeholder="image url"
                className="required"
                value={cover}
                onChange={(e) => setCover(e.target.value)}
                required
            />

            <button type="submit" id="edit-album-button" className="green">
                Edit album
            </button>
        </Form>
    )
}