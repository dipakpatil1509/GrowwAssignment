import {combineReducers} from 'redux'
import banksReducer from './banksReducer'
import favouritesReducer from './favouritesReducer'
import loaderReducer from './loaderReducer'

const rootReducer = combineReducers({
    banks:banksReducer,
    favourites:favouritesReducer,
    loader:loaderReducer
})

export default rootReducer