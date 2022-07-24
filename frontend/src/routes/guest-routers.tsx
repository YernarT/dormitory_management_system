import type { RouteProps } from './index';

import { lazy } from 'react';
import { sleep, role } from '@/utils';

import { CommonLoading } from '@/components/loading';

const guestRoutes: RouteProps[] = [
	{
		path: '/',
		component: lazy(async () => {
			await sleep(560);
			return import('@/pages/guest/LandingPage');
		}),
		fallback: <CommonLoading />,
		auth: false,
		role: [role.GUEST],
		title: 'route_/',
	},
];

export default guestRoutes;
