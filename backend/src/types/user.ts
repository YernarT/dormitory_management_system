export type allowedRole = 'TENANT' | 'DORM MANAGER' | 'ADMIN';

export interface UserProperties {
	_id: string;
	fullname: string;
	password: string;
	role: allowedRole;
	gender: boolean;
	createTime: Date;
}
