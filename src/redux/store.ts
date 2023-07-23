import { createStore, applyMiddleware } from 'redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import languageReducer from './language/languageReducer';
import thunk from 'redux-thunk';
import { actionLog } from './middlewares/actionLog';
import { productDetailSlice } from './productDetail/slice';

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer
})

const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));

export type RootState = ReturnType<typeof store.getState>;

export default store;