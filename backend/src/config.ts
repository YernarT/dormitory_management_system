type mode = 'development' | 'production';
export const MODE: mode = 'development';

export const DEV_DATABASE_URL =
	'mongodb://localhost:27017/dorm_management_system';
export const PROD_DATABASE_URL =
	'mongodb+srv://root:password-0@dorm_management_system-cluster.jlvxgis.mongodb.net/?retryWrites=true&w=majority';
