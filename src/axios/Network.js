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

export const getSearchNetwork = (search) => {
	return axios({
		method: 'GET',
		url: `/api/post/list?search=${search}`,
	});
};

export const getNetworkDetailById = (postId, accesstoken) => {
	return axios({
		method: 'GET',
		headers: { accesstoken },
		url: `/api/post/${postId}`,
	});
};

export const deleteMyNetwork = (postId, accesstoken) => {
	return axios({
		method: 'DELETE',
		headers: { accesstoken },
		url: `/api/post/${postId}`,
	});
};

// 구독 신청 및 취소
export const postNetworkSubscribe = (data, accesstoken) => {
	return axios({
		method: 'POST',
		headers: { accesstoken },
		url: `/api/subscribe`,
		data,
	});
};

// 내가 업로드한 모델 / 내가 구독중인 모델 / 이용 모델 페이지
export const getMyNetworkListById = (userId, page, search) => {
	return axios({
		method: 'GET',
		url: `/api/user/${userId}/post/list?filter=${page}&search=${search}`,
	});
};

export const postNetworkDetail = (accesstoken, formData) => {
	return axios({
		method: 'POST',
		url: `/api/post`,
		headers: { accesstoken },
		data: formData,
	});
};

export const postNetworkDetailInfo = (postId) => {
	return axios({
		method: 'POST',
		url: `/api/post/${postId}`,
	});
};

export const putNetworkDetail = (accesstoken, postId, formData) => {
	return axios({
		method: 'PUT',
		url: `/api/post/${postId}`,
		headers: { accesstoken },
		data: formData,
	});
};

export const postWeight = (accesstoken, formData, fileName, setState) => {
	return axios({
		method: 'POST',
		url: `/api/post/weight`,
		headers: { accesstoken },
		data: formData,
		onUploadProgress: (progressEvent) => {
			if (setState) {
				const p = Math.round(
					(progressEvent.loaded / progressEvent.total) * 100
				);
				setState(`${fileName} (${p}%)`);
			}
		},
	});
};

export const ownNetworkList = (userId, accesstoken, data) => {
	return axios({
		method: 'GET',
		url: `/api/user/${userId}/post/list`,
		headers: { accesstoken },
		data,
	});
};

export const postInference = (accesstoken, weightUuid, imageCount, price) => {
	return axios({
		method: 'POST',
		url: `/api/inference`,
		headers: { accesstoken },
		data: {
			weightUuid,
			imageCount,
			price,
			content: 'dump',
		},
	});
};

export const getLibrary = (postId, accesstoken) => {
	return axios({
		method: 'GET',
		url: `/api/inference/list/post/${postId}`,
		headers: { accesstoken },
	});
};
