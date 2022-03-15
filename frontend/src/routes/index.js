import tenantRoutes from './tenant-routes';
import commonRoutes from './common-routes';

const routes = [...tenantRoutes, ...commonRoutes];

export default routes;
