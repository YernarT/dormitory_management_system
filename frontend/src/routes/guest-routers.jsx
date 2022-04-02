import React, { lazy } from 'react';
import { sleep } from '@/utils';

import { CommonLoading } from '@/loading';

const guestRoutes = [
	{
		path: '/',
		component: lazy(async () => {
			await sleep(560);
			return import('@/pages/guest/LandingPage');
		}),
		fallback: <CommonLoading />,
		auth: false,
		role: ['guest'],
		title: 'route_/',
	},
];

export default guestRoutes;
