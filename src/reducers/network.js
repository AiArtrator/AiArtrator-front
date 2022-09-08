import { getNetworkDetailById } from '../axios/Network';

// Initial State
const initialState = {};

export const SET_NETWORKDETAIL = 'network/setNetworkDetail';
export const CLR_NETWORKDETAIL = 'network/clearNetworkDetail';

// action creators
export const setNetworkDetail = (networkDetail) => ({
	type: SET_NETWORKDETAIL,
	payload: networkDetail,
});

export const fetchNetworkDetail = (postId, accesstoken) => {
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

export const clearNetworkDetail = () => ({
	type: CLR_NETWORKDETAIL,
});

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
		case CLR_NETWORKDETAIL: {
			return {
				...state,
				detail: initialState,
			};
		}
		default:
			return state;
	}
};

export default reducer;
