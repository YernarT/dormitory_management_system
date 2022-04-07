import React, { lazy } from 'react';
import { sleep } from '@/utils';

import { CommonLoading } from '@/loading';

const orgManagerRoutes = [
	{
		path: '/org-manager',
		component: lazy(async () => {
			await sleep(560);
			return import('@/pages/org_manager/HomePage');
		}),
		fallback: <CommonLoading />,
		auth: true,
		role: ['org manager'],
		title: 'route_/',
	},
];

export default orgManagerRoutes;
