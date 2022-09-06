import { getNetworkDetailById } from '../axios/Network';

// Initial State
const initialState = {};

export const SET_NETWORKDETAIL = 'network/setNetworkDetail';

// action creators
export const setNetworkDetail = (networkDetail) => ({
	type: SET_NETWORKDETAIL,
	payload: networkDetail,
});

export const fetchNetworkDetail = (postId: String, accesstoken: String) => {
	return async (dispatch) => {
		try {
			const res = await getNetworkDetailById(postId, accesstoken);
			dispatch(setNetworkDetail(res.data.data));
			return res.data;
		} catch (err) {
			return err.response.data;
		}
	};
};

// Reducer
// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_NETWORKDETAIL: {
			return {
				...state,
				detail: action.payload,
			};
		}
		default:
			return state;
	}
};

export default reducer;
