import { apiServerInstance } from '../ajax';

// Get Dorm
export const reqGetMyDorm = () => apiServerInstance.get('/dorm/?get_mode=self');

// Create Dorm
export const reqCreateDorm = data => apiServerInstance.post('/dorm/', data);
