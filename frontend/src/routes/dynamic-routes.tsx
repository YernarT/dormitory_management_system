import type { allowedRole } from '@/utils';
import type { RouteProps } from './index';

import { lazy } from 'react';
import { sleep, role } from '@/utils';

import { CommonLoading } from '@/components/loading';

const dynamicRoutes: RouteProps[] = [
	{
		path: '/dormitories',
		// @ts-ignore 动态组件的路由不需要 component 参数
		component: null,
		isDynamicComponent: true,
		getComponent: (role: allowedRole) => {
			switch (role) {
				case 'GUEST':
					return lazy(async () => {
						await sleep(560);
						return import('@/pages/guest/DormListPage');
					});

				default:
					return lazy(async () => {
						await sleep(560);
						return import('@/pages/common/PageNotFoundPage');
					});
			}
		},
		fallback: <CommonLoading />,
		auth: false,
		role: role.all(),
		title: 'route_/',
	},
];

export default dynamicRoutes;
