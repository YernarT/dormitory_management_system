import commonRoutes from './common-routes';
import guestRoutes from './guest-routers';
import tenantRoutes from './tenant-routes';
import dormManagerRoutes from './dorm-manager-routers';
import orgManagerRoutes from './org-manager-routers';
import siteAdminRoutes from './site-admin-routers';
import authRoutes from './auth-routes';

const routes = [
	...commonRoutes,
	...guestRoutes,
	...tenantRoutes,
	...dormManagerRoutes,
	...orgManagerRoutes,
	...siteAdminRoutes,
	...authRoutes,
];

export default routes;
