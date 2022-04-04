import { apiServerInstance } from '../ajax';

// Get Dorm (居住的)
// export const reqGetMyDorm = () => apiServerInstance.get('/dorm/?get_mode=self');

// Get AL  Dorms
export const reqGetAllDorms = () => apiServerInstance.get('/dorm/');
