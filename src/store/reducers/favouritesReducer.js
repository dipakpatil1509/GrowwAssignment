const favouritesReducer = (state = {banks:[], city:null}, action) => {
    switch (action.type) {
        case 'Set_Favourites':
            return {...state, favourites:action.favourites};
        default:
            return {...state};
    }
};

export default favouritesReducer;