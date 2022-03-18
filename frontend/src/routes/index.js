import tenantRoutes from './tenant-routes';
import authRoutes from './auth-routes';
import commonRoutes from './common-routes';

const routes = [...tenantRoutes, ...authRoutes, ...commonRoutes];

export default routes;
