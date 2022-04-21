import { apiServerInstance } from '../ajax';

// Get Dorm (居住的)
// export const reqGetMyDorm = () => apiServerInstance.get('/dorm/?get_mode=self');

// Get ALL  Dorms
export const reqGetAllDorms = () =>
	apiServerInstance.get('/dorm/?get_mode=all');

// Get ALL Rooms
export const reqGetAllRooms = dormId =>
	apiServerInstance.get(`/dorm/room/?get_mode=by_dorm&dorm_id=${dormId}`);

// Get ALL Beds
export const reqGetAllBeds = roomId =>
	apiServerInstance.get(`/dorm/bed/?get_mode=by_room&room_id=${roomId}`);

// Create Order
export const reqCreateOrder = data => apiServerInstance.post('/order/', data);

// Get Request
export const reqGetRequest = () => apiServerInstance.get('/order/request/');

// Create Request
export const reqCreateRequest = data =>
	apiServerInstance.post('/order/request/', data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

// Delete Request
export const reqDeleteRequest = id =>
	apiServerInstance.delete(`/order/request/${id}/`);
