import { apiServerInstance } from '../ajax';

// Edit
export const reqEdit = data => apiServerInstance.put('/user/edit/', data);

// Change password
export const reqChangePassword = data =>
	apiServerInstance.put('/user/change_password/', data);

// Send feedback
export const reqSendFeedback = data =>
	apiServerInstance.post('/user/feedback/', data);
