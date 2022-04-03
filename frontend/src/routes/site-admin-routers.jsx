import React, { lazy } from 'react';
import { sleep } from '@/utils';

import { CommonLoading } from '@/loading';

const siteAdminRoutes = [
	{
		path: '/site-admin',
		component: lazy(async () => {
			await sleep(560);
			return import('@/pages/site_admin/HomePage');
		}),
		fallback: <CommonLoading />,
		auth: true,
		role: ['site admin'],
		title: 'route_/',
	},
];

export default siteAdminRoutes;
