import axios from 'axios';

export const Logout = () => {
	return axios(
		{
			method: 'POST',
			url: '/api/oauth/logout/',
		},
		{ withCredentials: true }
	);
};

export const getUserInfo = () => {
	return axios(
		{
			method: 'GET',
			url: '/api/account/me/',
		},
		{
			withCredentials: true,
		}
	);
};
