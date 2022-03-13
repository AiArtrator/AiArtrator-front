import axios from 'axios';

export const signup = (data) => {
	return axios({
		method: 'POST',
		url: '/api/auth/signup',
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

export const login = (data) => {
	return axios({
		method: 'POST',
		url: '/api/auth/login/email',
		data,
	});
};
