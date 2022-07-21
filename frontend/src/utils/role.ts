// 角色
export type allowedRole = 'GUEST' | 'TENANT' | 'DORM MANAGER' | 'ADMIN';

// 角色对象
export const role: {
	GUEST: 'GUEST';
	TENANT: 'TENANT';
	DORM_MANAGER: 'DORM MANAGER';
	ADMIN: 'ADMIN';

	// 所有角色
	all: () => ['GUEST', 'TENANT', 'DORM MANAGER', 'ADMIN'];
} = {
	GUEST: 'GUEST',
	TENANT: 'TENANT',
	DORM_MANAGER: 'DORM MANAGER',
	ADMIN: 'ADMIN',

	// 所有角色
	all() {
		return ['GUEST', 'TENANT', 'DORM MANAGER', 'ADMIN'];
	},
};
