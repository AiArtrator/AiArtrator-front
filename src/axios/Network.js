import axios from 'axios';

export const inference = (url) => {
	return axios({
		method: 'GET',
		url,
		responseType: 'arraybuffer',
	});
};

export const getNetworkDetailById = (postId: String) => {
	return axios({
		method: 'GET',
		url: `/api/post/${postId}`,
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
