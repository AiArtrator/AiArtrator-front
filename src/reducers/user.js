import { getUserById, Logout } from '../axios/User';

// Initial State
const initialState = {
	// user: {
	// 	id: 2,
	// 	email: 'hello1@email.com',
	// 	idFirebase: 'RKN8DBF3',
	// 	createdAt: '2021-11-28T14:15:29.724Z',
	// 	updatedAt: '2021-11-28T14:15:29.724Z',
	// 	isDeleted: false,
	// 	organization: '고려대학교',
	// 	loginId: 'seol2',
	// },
	// accesstoken: 'eW1WwuY29tIiwiaW2VzhpdM',
};

export const SET_USER = 'user/setUser';
export const SET_ACCESSTOKEN = 'user/setAccesstoken';
export const REMOVE_USER = 'user/removeUser';
export const REMOVE_ACCESSTOKEN = 'user/removeAccesstoken';

// export const SET_TOKEN = 'setToken';
// export const GET_TOKEN = 'getToken';

// action creators
export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

export const setAccsstoken = (accesstoken) => ({
	type: SET_ACCESSTOKEN,
	payload: accesstoken,
});

export const removeUser = () => ({
	type: REMOVE_USER,
});

export const removeAccsstoken = () => ({
	type: REMOVE_ACCESSTOKEN,
});

export const getUser = () => {
	return async function getUserThunk(dispatch, getState) {
		try {
			const id = getState().user.user.id;
			const res = await getUserById(id);
			dispatch(setUser(res.data.user));
		} catch (err) {
			console.error(err);
		}
	};
};

export const userLogout = async (dispatch, getState) => {
	try {
		dispatch(removeAccsstoken());
		dispatch(removeUser());
		const accesstoken = getState().user.accesstoken;
		const res = await Logout(accesstoken);
		alert(res.data.message); // TODO: remove alert
	} catch (err) {
		console.error(err);
	}
};

// Reducer
// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => {
	switch (action.type) {
		/* LOGIN */
		// case AUTH_LOGIN:
		// 	return {
		// 		...state,
		// 		login: {
		// 			status: 'WAITING',
		// 		},
		// 	};
		case SET_USER: {
			return {
				...state,
				user: action.payload,
				login: {
					status: 'SUCCESS',
				},
				status: {
					...state.status,
					isLoggedIn: true,
					currentUser: action.username,
				},
			};
		}
		case SET_ACCESSTOKEN: {
			return {
				...state,
				accesstoken: action.payload,
			};
		}
		case REMOVE_USER: {
			return {
				...state,
				user: undefined,
				login: undefined,
				status: undefined,
			};
		}
		case REMOVE_ACCESSTOKEN: {
			return {
				...state,
				accesstoken: undefined,
			};
		}

		default:
			return state;
	}
};

export default reducer;
