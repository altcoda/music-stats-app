import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalProvider';
import './SearchBar.css';


export const SearchBar = () => {

    const {query, setQuery} = useContext(GlobalContext);
    const [search, setSearch] = useState('');

    const onSearch = (e) => {
        e.preventDefault();
        setQuery({...query, search: search})
    }

    return (
        <form 
            id="search-form" 
            onSubmit={onSearch}
            className="search-form"
        >
            <input
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" id="search-button" className="search-button standart">Search</button>
        </form>
    );
}
