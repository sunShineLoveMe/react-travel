import { createStore, combineReducers, applyMiddleware } from 'redux';
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import languageReducer from './language/languageReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;

export default store;