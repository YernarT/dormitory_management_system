import React, { lazy } from 'react';
import { sleep } from '@/utils';

import { CommonLoading } from '@/loading';

const tenantRoutes = [
	{
		path: '/tenant',
		component: lazy(async () => {
			await sleep(360);
			return import('@/pages/tenant/HomePage');
		}),
		fallback: <CommonLoading />,
		auth: true,
		role: ['tenant'],
		title: 'route_/profile',
	},

	{
		path: '/rooms',
		component: lazy(async () => {
			await sleep(335);
			return import('@/pages/tenant/RoomsPage');
		}),
		fallback: <CommonLoading />,
		auth: true,
		role: ['tenant'],
		title: 'route_/profile',
	},

	{
		path: '/beds',
		component: lazy(async () => {
			await sleep(335);
			return import('@/pages/tenant/BedsPage');
		}),
		fallback: <CommonLoading />,
		auth: true,
		role: ['tenant'],
		title: 'route_/profile',
	},
];

export default tenantRoutes;
