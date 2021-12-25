// import { createStore, compose, applyMiddleware } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const configureStore = (initialState) => {
	const middlewares = [thunk];
	// const enhancer =
	// 	process.env.NODE_ENV === 'production'
	// 		? compose(applyMiddleware(...middlewares))
	// 		: composeWithDevTools(applyMiddleware(...middlewares));
	const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
	const store = createStore(rootReducer, initialState, enhancer);
	return store;
};

export default configureStore;
