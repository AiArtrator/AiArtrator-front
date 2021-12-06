import { getUserById, Logout } from '../axios/User';

// Initial State
const initialState = {
	user: {
		id: 2,
		email: 'hello1@email.com',
		idFirebase: 'RKN8DBF3',
		createdAt: '2021-11-28T14:15:29.724Z',
		updatedAt: '2021-11-28T14:15:29.724Z',
		isDeleted: false,
		organization: '고려대학교',
		loginId: 'seol2',
	},
	accesstoken: 'eW1WwuY29tIiwiaW2VzhpdM',
};

export const SET_USER = 'user/setUser';
export const SET_ACCESSTOKEN = 'user/setAccesstoken';

// action creators
export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

export const setAccsstoken = (accesstoken) => ({
	type: SET_ACCESSTOKEN,
	payload: accesstoken,
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

export const userLogout = async () => {
	try {
		await Logout();
		window.location.href = '/';
	} catch (err) {
		console.dir(err);
	}
};

// Reducer
// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER: {
			return {
				...state,
				user: action.payload,
			};
		}
		case SET_ACCESSTOKEN: {
			return {
				...state,
				accesstoken: action.payload,
			};
		}
		default:
			return state;
	}
};

export default reducer;
