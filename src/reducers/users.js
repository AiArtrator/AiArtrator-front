import { getUserInfo, Logout } from '../axios/User';

// Initial State
const initialState = {
	user: null,
};

export const SET_USER = 'SET_USER';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';

// action creators
export const setUser = (data) => ({
	type: SET_USER,
	data,
});

export const setUserProfile = (data) => ({
	type: SET_USER_PROFILE,
	data,
});

// API actions
/**
 * api에서 받은 데이터 (res.data)에 setUser로 type을 추가하고,
 * 그 객체를 dispatch 함수로 reducer를 실행시켜 상태를 업데이트한다?
 */
export const getUser = async (dispatch) => {
	try {
		const res = await getUserInfo();
		dispatch(setUser(res.data));
	} catch (err) {
		console.dir(err);
	}
};

export const userLogout = async () => {
	try {
		await Logout();
		window.location.href = '/';
	} catch (err) {
		console.dir(err);
	}
};

// Reducer Funtions => reducer를 정의
export const applySetUser = (state, action) => {
	return {
		...state,
		user: action.data,
	};
};

export const applySetUserProfile = (state, action) => {
	return {
		...state,
		user: {
			...state.user,
			profile: action.data,
		},
	};
};

// Reducer
/**
 * 위에서 정의한 reducer 함수를 하나로 묶음
 * <- action의 type으로 어떤 reducer를 쓸지 구분
 */
// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return applySetUser(state, action);
		case SET_USER_PROFILE:
			return applySetUserProfile(state, action);
		default:
			return state;
	}
};

export default reducer;
