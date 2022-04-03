import { apiServerInstance } from '../ajax';

// Get Cities
export const reqCities = () => apiServerInstance.get('/dorm/city/');

// Create City
export const reqCreateCity = data =>
	apiServerInstance.post('/dorm/city/', data);

// Delete City
export const reqDeleteCity = id =>
	apiServerInstance.delete(`/dorm/city/${id}/`);
