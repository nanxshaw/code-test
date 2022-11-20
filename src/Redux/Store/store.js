import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../Reducers/reducers';

const persistConfig = {
    key: 'root',
    storage: storage,
};

const Reducer = persistReducer(persistConfig, rootReducer);

const middleware = applyMiddleware(thunk);

const store = createStore(Reducer, middleware);

const persistor = persistStore(store);

export { persistor, store };