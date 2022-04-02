import React, { lazy } from 'react';
import { sleep } from '@/utils';

import { CommonLoading } from '@/loading';

const dormManagerRoutes = [
	{
		path: '/dorm-manager',
		component: lazy(async () => {
			await sleep(560);
			return import('@/pages/dorm_manager/HomePage');
		}),
		fallback: <CommonLoading />,
		auth: true,
		role: ['dorm manager'],
		title: 'route_/',
	},
];

export default dormManagerRoutes;
