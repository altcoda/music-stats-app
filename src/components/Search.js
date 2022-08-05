import { SearchBar } from './SearchBar';
import './Search.css';
import { Fragment, useContext } from 'react';
import { SelectTag } from './UI/Select';
import { GlobalContext } from '../context/GlobalProvider';
import { FaTag } from 'react-icons/fa';


export const Search = () => {

    const {query} = useContext(GlobalContext);

    return (
        <Fragment>
            <h2 className="search-title"><FaTag />&nbsp; Most popular {query.tag} albums </h2>
            <div id="search" className="search">
                <SelectTag />
                <SearchBar />
            </div>
        </Fragment>
    );
};
