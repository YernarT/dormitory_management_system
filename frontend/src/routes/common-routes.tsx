import type { RouteProps } from './index';

import { lazy } from 'react';
import { sleep, role } from '@/utils';

import { CommonLoading } from '@/components/loading';

const commonRoutes: RouteProps[] = [
	{
		path: '/404',
		component: lazy(async () => {
			await sleep(150);
			return import('@/pages/common/PageNotFoundPage');
		}),
		fallback: <CommonLoading />,
		auth: false,
		role: role.all(),
		title: 'route_/404',
	},
];

export default commonRoutes;
