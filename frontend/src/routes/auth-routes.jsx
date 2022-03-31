import React, { lazy } from 'react';
import { sleep } from '@/utils';

import { CommonLoading } from '@/loading';

const authRoutes = [
	{
		path: '/auth/login',
		component: lazy(async () => {
			await sleep(265);
			return import('@/pages/auth/LoginPage');
		}),
		fallback: <CommonLoading />,
		auth: false,
		role: ['guest'],
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
		role: ['guest'],
		title: 'route_/auth/register',
	},
];

export default authRoutes;
