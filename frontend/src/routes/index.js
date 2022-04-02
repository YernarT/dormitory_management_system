import guestRoutes from './guest-routers';
import tenantRoutes from './tenant-routes';
import dormManagerRoutes from './dorm-manager-routers';
import siteAdminRoutes from './site-admin-routers';
import authRoutes from './auth-routes';
import commonRoutes from './common-routes';

const routes = [
	...guestRoutes,
	...tenantRoutes,
	...dormManagerRoutes,
	...siteAdminRoutes,
	...authRoutes,
	...commonRoutes,
];

export default routes;
