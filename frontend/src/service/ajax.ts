import axios from 'axios';
import { localStorage } from '@/utils';
import { defaultUserState } from '@/store';

export const apiServerInstance = axios.create({
	baseURL: 'http://localhost:8000/api',
	validateStatus: status => status >= 200 && status < 300,
});

// Request interceptor
apiServerInstance.interceptors.request.use(config => {
	// Every time the token is updated in the page, the localstorage needs to be updated together
	const { token } = localStorage.get('user', defaultUserState);

	if (token && config.headers) {
		config.headers['X-AUTH-TOKEN'] = token;
	}

	return config;
});

// Response interceptor
apiServerInstance.interceptors.response.use(
	value => {
		return value.data;
	},

	error => {
		if (error.response && error.response.status) {
			let { status } = error.response;

			if (status === 401) {
				localStorage.set('user', defaultUserState);
				return Promise.reject({
					...error.response.data,
					needExecuteLogout: true,
					initialUser: defaultUserState,
				});
			}

			if (status >= 400) {
				return Promise.reject({
					...error.response.data,
					needExecuteLogout: false,
					initialUser: undefined,
				});
			}
		}

		if (error.message === 'Network Error') {
			return Promise.reject({
				message: 'Network lost connection',
				needExecuteLogout: false,
				initialUser: undefined,
			});
		}

		console.error('Error in request: ', error);
		return Promise.reject({
			message: 'The server crashed',
			needExecuteLogout: false,
			initialUser: undefined,
		});
	},
);
