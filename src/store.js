// import { createStore, compose, applyMiddleware } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = (initialState) => {
	const middlewares = [thunk];
	// const enhancer =
	// 	process.env.NODE_ENV === 'production'
	// 		? compose(applyMiddleware(...middlewares))
	// 		: composeWithDevTools(applyMiddleware(...middlewares));
	const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
	const store = createStore(persistedReducer, initialState, enhancer);
	const persistor = persistStore(store);
	return { store, persistor };
};

export default configureStore;
