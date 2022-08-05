import './SearchBar.css';
import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalProvider';
import { FaSearch } from 'react-icons/fa';


export const SearchBar = () => {

    const {query, setQuery} = useContext(GlobalContext);
    const [search, setSearch] = useState('');

    const onSearch = (e) => {
        e.preventDefault();
        setQuery({...query, search: search})
    }

    return (
        <form id="search-form" onSubmit={onSearch} className="search-form">
            <input
                placeholder="Search by album/artist name"
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" id="search-button" className="search-button purple"><FaSearch /></button>
        </form>
    );
}
