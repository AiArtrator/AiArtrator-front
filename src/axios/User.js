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

export const nicknameDupl = (data) => {
	return axios({
		method: 'POST',
		url: '/api/auth/check/email',
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
