import axios from 'axios';

export const signup = (data) => {
	return axios({
		method: 'POST',
		url: '/api/auth/signup',
		data,
	});
};

export const emailDupl = (data) => {
	return axios({
		method: 'POST',
		url: '/api/auth/check/email',
		data,
	});
};

export const phoneDupl = (data) => {
	return axios({
		method: 'POST',
		url: '/api/auth/check/phone',
		data,
	});
};

export const nicknameDupl = (data) => {
	return axios({
		method: 'POST',
		url: '/api/auth/check/nickname',
		data,
	});
};

export const Logout = (accesstoken: String) => {
	return axios(
		{
			method: 'POST',
			url: '/api/auth/logout',
			headers: { accesstoken },
		},
		{ withCredentials: true }
	);
};

export const getUserById = (id) => {
	return axios(
		{
			method: 'GET',
			url: `/api/user/me/${id}`,
		},
		{
			withCredentials: true,
		}
	);
};

// Login
export const login = (data) => {
	return axios({
		method: 'POST',
		url: '/api/auth/login/email',
		data,
	});
};

export const getMypage = (userId: String) => {
	return axios({
		method: 'GET',
		url: `/api/user/${userId}`,
	});
};

export const putReviseInfo = (accesstoken: String, formData: Object) => {
	return axios({
		method: 'PUT',
		url: '/api/user',
		headers: { accesstoken },
		data: formData,
	});
};
