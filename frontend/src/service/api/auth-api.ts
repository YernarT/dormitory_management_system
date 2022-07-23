import type { AxiosResponse } from 'axios';

import { apiServerInstance } from '../ajax';

interface loginData {
	email: string;
	password: string;
}
interface loginSuccessResponse {
	token: string;

	user: {};
}
interface loginFailResponse {
	message: string;
}
// Login
export const reqLogin = (
	data: loginData,
): Promise<AxiosResponse<loginSuccessResponse, loginFailResponse>> =>
	apiServerInstance.post('/user/login/', data);

// Register
export const reqRegister = (data: any) =>
	apiServerInstance.post('/user/register/', data);
