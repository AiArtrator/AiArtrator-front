import axios from 'axios';

export const inference = (url) => {
	return axios({
		method: 'GET',
		url,
		responseType: 'arraybuffer',
	});
};

export const getNetworkList = (data) => {
	return axios({
		method: 'GET',
		url: `/api/post/list?search=`,
		data,
	});
};

export const getSearchNetwork = (search: String) => {
	return axios({
		method: 'GET',
		url: `/api/post/list?search=${search}`,
	});
};

// 모델디테일 페이지
export const getNetworkDetailById = (postId: String, accesstoken: String) => {
	return axios({
		method: 'GET',
		headers: { accesstoken },
		url: `/api/post/${postId}`,
	});
};

export const deleteMyNetwork = (postId: String, accesstoken: String) => {
	return axios({
		method: 'DELETE',
		headers: { accesstoken },
		url: `/api/post/${postId}`,
	});
};

// 구독 신청 및 취소
export const postNetworkSubscribe = (data, accesstoken: String) => {
	return axios({
		method: 'POST',
		headers: { accesstoken },
		url: `/api/subscribe`,
		data,
	});
};

// 내가 업로드한 모델 / 내가 구독중인 모델 / 이용 모델 페이지
export const getMyNetworkListById = (
	userId: String,
	page: String,
	search: String
) => {
	return axios({
		method: 'GET',
		url: `/api/user/${userId}/post/list?filter=${page}&search=${search}`,
	});
};

export const postNetworkDetail = (accesstoken: String, formData: Object) => {
	return axios({
		method: 'POST',
		url: `/api/post`,
		headers: { accesstoken },
		data: formData,
	});
};

export const putNetworkDetail = (
	accesstoken: String,
	postId: String,
	formData: Object
) => {
	return axios({
		method: 'PUT',
		url: `/api/post/${postId}`,
		headers: { accesstoken },
		data: formData,
	});
};

export const ownNetworkList = (userId: String, accesstoken: String, data) => {
	return axios({
		method: 'GET',
		url: `/api/user/${userId}/post/list`,
		headers: { accesstoken },
		data,
	});
};
