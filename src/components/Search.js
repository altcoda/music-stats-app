import { SearchBar } from './SearchBar';
import './Search.css';
import { Fragment, useContext, useState } from 'react';
import { SelectTag } from './Select';
import { GlobalContext } from '../context/GlobalProvider';


export const Search = () => {

    const {query} = useContext(GlobalContext);

    return (
        <Fragment>
            <h2 className="search-title">Most Popular Albums with {query.tag} tag</h2>
            <div id="search" className="search">
                <SelectTag />
                <SearchBar />
            </div>
        </Fragment>
    );
};
