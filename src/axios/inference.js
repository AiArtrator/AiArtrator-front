import axios from 'axios';

export const inference = (url) => {
	return axios({
		method: 'GET',
		url,
		responseType: 'arraybuffer',
	});
};
