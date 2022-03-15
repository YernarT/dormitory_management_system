import React, { lazy } from 'react';
import { sleep } from '@/utils';

import { CommonLoading } from '@/loading';

const tenantRoutes = [
	{
		path: ['/tenant', '/tenant/home'],
		component: lazy(async () => {
			await sleep(360);
			return import('@/pages/tenant/HomePage');
		}),
		fallback: <CommonLoading />,
		auth: true,
		role: ['tenant'],
		title: 'Home | React Template',
	},
];

export default tenantRoutes;
