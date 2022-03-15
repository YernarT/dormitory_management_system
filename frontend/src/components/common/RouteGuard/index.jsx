import React, { memo, Suspense } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

import { useTitle } from 'ahooks';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store';

export default memo(function RouteGuard({ routes }) {
	const { pathname } = useLocation();

	const user = useRecoilValue(userAtom);

	const targetConfig = routes.find(routeConfig => {
		if (Array.isArray(routeConfig.path)) {
			return routeConfig.path.includes(pathname);
		}

		return routeConfig.path === pathname;
	});

	useTitle(targetConfig?.title || document.title);

	// Registered route
	if (targetConfig) {
		// Require authorization, but user not authorized
		if (targetConfig.auth && Boolean(user.jwt) === false) {
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
