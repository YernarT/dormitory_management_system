import { apiServerInstance } from '../ajax';

// Edit
export const reqEdit = data => apiServerInstance.post('/user/edit/', data);
