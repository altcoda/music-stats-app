export const RootReducer = (state, action) => {
    switch(action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload
            }
        case "SET_QUERY":
            return {
                ...state,
                query: action.payload
            }
        case "SET_ALBUMS_LIST":
            return {
                ...state,
                albumsList: action.payload
            }
        case "SET_USER_ALBUMS":
            return {
                ...state,
                userAlbums: action.payload
            }
        default:
            return state;
    }
};
