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

// Get Organization Categories
export const reqGetOrgaizationCategories = () =>
	apiServerInstance.get('/dorm/organization/category/');

// Get Dorm Managers
export const reqGetDormManagers = () =>
	apiServerInstance.get('/dorm/dorm_manager/');

// Create Dorm Manager
export const reqCreateDormManager = data =>
	apiServerInstance.post('/dorm/dorm_manager/', data);

// Delete Dorm Manager
export const reqDeleteDormManager = id =>
	apiServerInstance.delete(`/dorm/dorm_manager/${id}/`);

// Get Rooms
export const reqGetRooms = () => apiServerInstance.get('/dorm/room/');

// Create Room
export const reqCreateRoom = data =>
	apiServerInstance.post('/dorm/room/', data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

// Delete Room
export const reqDeleteRoom = id =>
	apiServerInstance.delete(`/dorm/room/${id}/`);
