import React, {createContext, useReducer} from 'react';
import { RootReducer } from './reducers/RootReducer';


const initialState = {
    user: null,
    siteName: 'Music Stats',
    query: {page: 1, tag: 'rock', search: ''},
    albumsList: [],
    userAlbums: []
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

    const setUserAlbums = (albums) => {
        dispatch({type:'SET_USER_ALBUMS', payload: albums})
    }

    return (
    <GlobalContext.Provider
        value={{
            ...state,
            setUser,
            setQuery,
            setAlbumsList,
            setUserAlbums
        }}
    >
        {children}
    </GlobalContext.Provider>
    );
}
