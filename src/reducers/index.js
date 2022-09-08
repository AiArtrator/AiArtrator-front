import { combineReducers } from 'redux';
import userReducer from './user';
import networkReducer from './network';
import tokenReducer from './token';

const rootReducer = combineReducers({
	user: userReducer,
	network: networkReducer,
	token: tokenReducer,
});

export default rootReducer;
