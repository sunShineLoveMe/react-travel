import { createStore, applyMiddleware } from 'redux';
import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import languageReducer from './language/languageReducer';
import thunk from 'redux-thunk';
import { actionLog } from './middlewares/actionLog';
import { productDetailSlice } from './productDetail/slice';
import { productSearchSlice } from './productSearch/slice';

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer
})

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));
const store  = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionLog),
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;