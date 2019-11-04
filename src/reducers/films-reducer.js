const initialState = {
favorites:[],
};
export default (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case 'GET_FILMS_REQUEST':
            return {...state, loading: true};

        case 'GET_FILMS_SUCCESS':
            return {...state, ...payload, loading: false};

        case 'GET_FILMS_FAILURE':
            return {...state, loading: false, errorMessage: payload};


        case "DELETE_FAVORITE":
            return state.filter(items => items.id !== payload);

        case "ADD_FAVORITE":

            return {...state, favorites: [payload,...state.favorites]};

        case 'GET_MOVIE_REQUEST':
            return {...state, loading: true};
        case 'GET_MOVIE_SUCCESS':
            return {...state, payload, loading: false};
        case 'GET_MOVIE_FAILURE':
            return {...state, loading: false, errorMessage: payload};


        default:
            return state
    }
}


