import type { RouteProps } from './index';

import { lazy } from 'react';
import { sleep, role } from '@/utils';

import { CommonLoading } from '@/components/loading';

const authRoutes: RouteProps[] = [
	{
		path: '/auth/login',
		component: lazy(async () => {
			await sleep(265);
			return import('@/pages/auth/LoginPage');
		}),
		fallback: <CommonLoading />,
		auth: false,
		role: [role.GUEST],
		title: 'route_/auth/login',
	},

	{
		path: '/auth/register',
		component: lazy(async () => {
			await sleep(265);
			return import('@/pages/auth/RegisterPage');
		}),
		fallback: <CommonLoading />,
		auth: false,
		role: [role.GUEST],
		title: 'route_/auth/register',
	},
];

export default authRoutes;
