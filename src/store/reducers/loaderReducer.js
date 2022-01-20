const loaderReducer = (state = {loader:false}, action) => {
    switch (action.type) {
        case 'Set_Loader':
            return {...state, loader:action.loader};
        default:
            return {...state};
    }
};

export default loaderReducer;