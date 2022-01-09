import { getNetworkDetailById } from '../axios/Network';

// Initial State
const initialState = {
	// detail: {
	// 	id: 6,
	// 	userId: 2,
	// 	title: '이미지 생성 테스트 게시',
	// 	description: '이미지를 스토리지에 올려보자',
	// 	ver: '1',
	// 	imageUrls:
	// 		'{"https://firebasestorage.googleapis.com/v0/b/p-o-g-cf552.appspot.com/o/20211128_155757_374944244141.jpg?alt=media","https://firebasestorage.googleapis.com/v0/b/p-o-g-cf552.appspot.com/o/20211128_155757_151033238999.jpg?alt=media"}',
	// 	createdAt: '2021-11-28T15:57:57.885Z',
	// 	updatedAt: '2021-11-28T15:57:57.885Z',
	// 	isDeleted: false,
	// 	tags: [
	// 		{
	// 			id: 1,
	// 			name: '태그1',
	// 		},
	// 		{
	// 			id: 2,
	// 			name: '태그2',
	// 		},
	// 		{
	// 			id: 3,
	// 			name: '태그3',
	// 		},
	// 	],
	// },
};

export const SET_NETWORKDETAIL = 'network/setNetworkDetail';

// action creators
export const setNetworkDetail = (networkDetail) => ({
	type: SET_NETWORKDETAIL,
	payload: networkDetail,
});

export const fetchNetworkDetail = (postId: String) => {
	return async (dispatch) => {
		try {
			const res = await getNetworkDetailById(postId);
			dispatch(setNetworkDetail(res.data.data));
		} catch (err) {
			console.error(err);
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
