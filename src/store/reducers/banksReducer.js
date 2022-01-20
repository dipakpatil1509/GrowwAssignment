const banksReducer = (state = {banks:[], city:null}, action) => {
    switch (action.type) {
        case 'SET_BANKS':
            return {...state, banks:action.banks};
        case 'SET_CITY':
            return {...state, city:action.city};
        default:
            return {...state};
    }
};

export default banksReducer;