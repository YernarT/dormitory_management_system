import React, { lazy } from 'react';
import { sleep } from '@/utils';

import { CommonLoading } from '@/loading';

const commonRoutes = [
	{
		path: '/404',
		component: lazy(async () => {
			await sleep(150);
			return import('@/pages/common/PageNotFoundPage');
		}),
		fallback: <CommonLoading />,
		auth: false,
		role: ['guest', 'tenant', 'org manager', 'site admin'],
		title: 'route_/404',
	},

	{
		path: '/profile',
		component: lazy(async () => {
			await sleep(265);
			return import('@/pages/common/ProfilePage');
		}),
		fallback: <CommonLoading />,
		auth: true,
		role: ['tenant', 'org manager', 'site admin'],
		title: 'route_/profile',
	},
];

export default commonRoutes;
