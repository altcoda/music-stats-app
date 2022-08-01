import React, {createContext, useReducer} from 'react';
import { RootReducer } from './reducers/RootReducer';

const genres = [
    {  label: "rock", value: "rock" },
    {  label: "metal", value: "metal" },
    {  label: "classical", value: "classical" },
    {  label: "pop", value: "pop" },
    {  label: "synth", value: "synth" },
    {  label: "techno", value: "techno" },
    {  label: "punk", value: "punk" },
    {  label: "blues", value: "blues" },
    {  label: "indie", value: "indie" },
    {  label: "anime", value: "anime" },
    {  label: "soundtrack", value: "soundtrack" }
]

const initialState = {
    user: null,
    siteName: 'Music Stats',
    query: {page: 1, tag: 'rock', search: ''},
    albumsList: [],
    tagOptions: genres
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {

    const [state, dispatch] = useReducer(RootReducer, initialState);

    const setUser = (user) => {
        dispatch({type:'SET_USER', payload: user})
    }

    const setQuery = (query) => {
        dispatch({type:'SET_QUERY', payload: query})
    }

    const setAlbumsList = (albums) => {
        dispatch({type:'SET_ALBUMS_LIST', payload: albums})
    }

    return (
    <GlobalContext.Provider
        value={{
            ...state,
            setUser,
            setQuery,
            setAlbumsList
        }}
    >
        {children}
    </GlobalContext.Provider>
    );
}
