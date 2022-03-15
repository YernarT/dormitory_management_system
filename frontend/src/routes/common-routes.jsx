import React, { lazy } from 'react';
import { sleep } from '@/utils';

import { CommonLoading } from '@/loading';

const commonRoutes = [
	{
		path: '/',
		component: lazy(async () => {
			await sleep(420);
			return import('@/pages/common/LandingPage');
		}),
		fallback: <CommonLoading />,
		auth: false,
		role: ['guest', 'tenant', 'dorm manager', 'site admin'],
	},
	{
		path: '/404',
		component: lazy(() => import('@/pages/common/PageNotFoundPage')),
		fallback: <CommonLoading />,
		auth: false,
		role: ['guest', 'tenant', 'dorm manager', 'site admin'],
		title: '404 | React Template',
	},
];

export default commonRoutes;
