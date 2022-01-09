import { combineReducers } from 'redux';
import userReducer from './user';
import networkReducer from './network';

const rootReducer = combineReducers({
	user: userReducer,
	network: networkReducer,
});

export default rootReducer;
