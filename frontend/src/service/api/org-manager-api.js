import { apiServerInstance } from '../ajax';

// Get Cities
export const reqGetCities = () => apiServerInstance.get('/dorm/city/');

// Get Dorms
export const reqGetDorms = () => apiServerInstance.get('/dorm/?get_mode=self');

// Create Dorm
export const reqCreateDorm = data =>
	apiServerInstance.post('/dorm/', data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

// Get My Organization
export const reqGetMyOrgaization = () =>
	apiServerInstance.get('/dorm/organization/?get_mode=self');

// Create Organization
export const reqCreateOrgaization = data =>
	apiServerInstance.post('/dorm/organization/', data);
