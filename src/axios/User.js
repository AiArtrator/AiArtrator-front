import axios from 'axios';

export const signup = (data) => {
	return axios({
		method: 'POST',
		url: '/api/auth/signup',
		data,
	});
};

export const Logout = () => {
	return axios(
		{
			method: 'POST',
			url: '/api/auth/logout/',
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
export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
