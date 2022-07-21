import { apiServerInstance } from '../ajax';

// Login
export const reqLogin = data => apiServerInstance.post('/user/login/', data);

// Register
export const reqRegister = data =>
	apiServerInstance.post('/user/register/', data);
