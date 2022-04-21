import { apiServerInstance } from '../ajax';

// Get Cities
export const reqCities = () => apiServerInstance.get('/dorm/city/');

// Create City
export const reqCreateCity = data =>
	apiServerInstance.post('/dorm/city/', data);

// Delete City
export const reqDeleteCity = id =>
	apiServerInstance.delete(`/dorm/city/${id}/`);

// Get Feedbacks
export const reqFeedbacks = () => apiServerInstance.get('/user/feedback/');

// Delete Feedbacks
export const reqDeleteFeedback = id =>
	apiServerInstance.delete(`/user/feedback/${id}/`);

// Delete All Feedbacks
export const reqDeleteAllFeedback = () =>
	apiServerInstance.delete('/user/feedback/');

// Get Statistic
export const reqGetStatistic = () => apiServerInstance.get('/order/statistic/');
