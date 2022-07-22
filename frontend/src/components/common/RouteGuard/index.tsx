// 类型
import type { RouteProps } from '@/routes';

// React & React 周边
import { memo, Suspense } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store';

// 业务库
import { useTranslation } from 'react-i18next';
import { useTitle } from 'ahooks';

// 定义组件Props类型
interface RouteGuardProps {
	routes: RouteProps[];
}

export default memo(function RouteGuard({ routes }: RouteGuardProps) {
	const user = useRecoilValue(userAtom);
	const { t } = useTranslation();
	const { pathname } = useLocation();

	// 当前匹配的路由
	const targetConfig = routes.find(routeConfig => {
		if (Array.isArray(routeConfig.path)) {
			return routeConfig.path.includes(pathname);
		}

		return routeConfig.path === pathname;
	});

	// 修改 <title> Site Title <title />
	const siteTitle = t(targetConfig?.title || document.title);
	useTitle(siteTitle);

	// 路由反射
	const pathConvert = {
		'ADMIN': '/admin',
		'DORM MANAGER': '/dorm-manager',
		'TENANT': '/tenant',
	};

	// 反射 '/' 根路由
	if (user.role !== 'GUEST' && pathname === '/') {
		return <Redirect to={pathConvert[user.role]} />;
	}

	// Registered route
	if (targetConfig) {
		if (targetConfig.auth && Boolean(user.token) === false) {
			// Require authorization, but user not authorized
			return <Redirect to="/auth/login" />;
		}

		// Disallowed user role
		if (!targetConfig.role.includes(user.role)) {
			return <Redirect to="/404" />;
		}

		// Everything is ok
		return (
			<Suspense fallback={targetConfig.fallback}>
				<Route
					exact
					path={targetConfig.path}
					component={targetConfig.component}
				/>
			</Suspense>
		);
	}

	// Unregistered route
	return <Redirect to="/404" />;
});
