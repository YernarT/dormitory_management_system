import { generateI18nPluralIntervalRule } from '@/utils';

export default {
	'kkKZ': 'Kazakh',
	'enUS': 'English',

	// common route
	'route_/': 'Dormitory Management System',
	'route_/404': '404 - DMS',
	'route_/profile': 'Profile - DMS',

	// auth route
	'route_/auth/login': 'Login - DMS',
	'route_/auth/register': 'Register - DMS',

	// Loading
	commonLoadingHelpText: 'Loading...',

	// Header
	'header_site_name_short': 'DMS',
	'header_publish': 'Dormitory publication',
	'header_seek': 'Search dormitory',

	// Footer
	'footer_site_name': 'Dormitory Management System',

	// Landing Page
	'landingP_welcome_subTitle':
		'Suitable for universities and institutions with dormitories',

	// Related Auth
	'auth_missing_email': 'Email is a required field',
	'auth_incorrect_format_email': 'Email format is incorrect',

	'auth_password': 'Password',
	'auth_missing_password': 'Password is a required field',
	'auth_password_less_than_rule': generateI18nPluralIntervalRule({
		'0-inf': 'Құпия сөз ұзындығы {{ min }}-ден кем',
	}),
	'auth_password_more_than_rule': generateI18nPluralIntervalRule({
		'0-inf': 'Құпия сөз ұзындығы {{ max }}-ден артық',
	}),
	'auth_rePassword': 'Repeat password',
	'auth_rePassword_noMatch': 'The passwords entered do not match',
	'auth_or': 'or',

	'auth_register': 'Register',
	'auth_login': 'Login',
};
