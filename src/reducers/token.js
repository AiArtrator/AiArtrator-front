// import { tokenStatusInNav } from '../axios/User';
// import { useSelector } from 'react-redux';

// // Initial State
// const initialState = {
// 	token: 'loading',
// 	status: {
// 		isToken: false,
// 	},
// };

// export const SET_TOKEN = 'token/setToken';
// export const GET_TOKEN = 'token/getToken';

// // action creators
// export const setToken = (token) => ({
// 	type: SET_TOKEN,
// 	payload: token,
// });

// export const fetchToken = () => {
// 	return async (dispatch) => {
// 		try {
// 			const accesstoken = useSelector((state) => state.user.accesstoken);
// 			const res = await tokenStatusInNav(accesstoken);
// 			dispatch(setToken(res.data.data));
// 			console.log('token success');
// 		} catch (err) {
// 			console.error(err);
// 		}
// 	};
// };

// // Reducer
// // eslint-disable-next-line default-param-last
// const reducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case SET_TOKEN: {
// 			return {
// 				...state,
// 				token: action.payload,
// 				loadToken: {
// 					status: 'SUCCESS',
// 				},
// 				status: {
// 					...state.status,
// 					isToken: true,
// 				},
// 			};
// 		}

// 		default:
// 			return state;
// 	}
// };

// export default reducer;
