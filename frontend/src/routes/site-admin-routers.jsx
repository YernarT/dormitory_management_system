import React, { lazy } from 'react';
import { sleep } from '@/utils';

import { CommonLoading } from '@/loading';

const siteAdminRoutes = [
	{
		path: '/site-admin',
		component: lazy(async () => {
			await sleep(560);
			return import('@/pages/guest/LandingPage');
		}),
		fallback: <CommonLoading />,
		auth: true,
		role: ['site admin'],
		title: 'route_/',
	},
];

export default siteAdminRoutes;
