import { createStore, combineReducers } from 'redux';
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import languageReducer from './language/languageReducer';

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer
})

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;

export default store;