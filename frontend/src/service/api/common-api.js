import { apiServerInstance } from '../ajax';

// Edit
export const reqEdit = data => apiServerInstance.post('/user/edit/', data);

// Change password
export const reqChangePassword = data =>
	apiServerInstance.post('/user/change_password/', data);
