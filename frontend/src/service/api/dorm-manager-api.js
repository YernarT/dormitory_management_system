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

// Get Rooms
export const reqGetRooms = () => apiServerInstance.get('/dorm/room/');

// Create Room
export const reqCreateRoom = data =>
	apiServerInstance.post('/dorm/room/', data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
