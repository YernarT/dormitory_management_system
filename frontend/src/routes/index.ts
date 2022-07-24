import type { LazyExoticComponent, NamedExoticComponent } from 'react';
import type { allowedRole } from '@/utils';

export interface RouteProps {
	path: string | string[];
	component:
		| LazyExoticComponent<() => JSX.Element> // 普通组件
		| LazyExoticComponent<NamedExoticComponent<object>>; // memo 优化组件

	fallback: JSX.Element;
	auth: boolean;
	role: allowedRole[];
	title?: string;
	isDynamicComponent?: boolean;
	getComponent?:
		| ((role: allowedRole) => React.LazyExoticComponent<() => JSX.Element>)
		// 普通组件 ↑
		// memo 优化组件 ↓
		| ((
				role: allowedRole,
		  ) => LazyExoticComponent<NamedExoticComponent<object>>);
}

import commonRoutes from './common-routes';
import dynamicRoutes from './dynamic-routes';
import guestRoutes from './guest-routers';
import authRoutes from './auth-routes';

const routes: RouteProps[] = [
	...commonRoutes,
	...dynamicRoutes,
	...guestRoutes,
	...authRoutes,
];

export default routes;
