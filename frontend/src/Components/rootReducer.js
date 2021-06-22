import {combineReducers}  from 'redux';
import AuthReducer from './Redux/auth/AuthReducer';
import CateogoryReducer from './Redux/category/CateogoryReducer';
import ProductReducer from './Redux/product/ProductReducer';
export default combineReducers({
    auth:AuthReducer,
    categories:CateogoryReducer,
    products:ProductReducer,
})
