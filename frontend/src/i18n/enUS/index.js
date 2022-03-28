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
		'0-inf': 'The password is less than {{ min }}',
	}),
	'auth_password_more_than_rule': generateI18nPluralIntervalRule({
		'0-inf': 'The password is more than {{ max }}',
	}),
	'auth_rePassword': 'Repeat password',
	'auth_rePassword_noMatch': 'The passwords entered do not match',
	'auth_or': 'or',

	'auth_register': 'Register',
	'auth_login': 'Login',

	'auth_fullname': 'Fullname',
	'auth_missing_fullname': 'Fullname is a required field',
	'auth_fullname_less_than_rule': generateI18nPluralIntervalRule({
		'0-inf': 'The fullname length is less than {{ min }}',
	}),
	'auth_fullname_more_than_rule': generateI18nPluralIntervalRule({
		'0-inf': 'The fullname length is more than {{ min }}',
	}),
	'auth_save_changes': 'Save changes',

	// Profile
	'profile_tabName_basic_infomation': 'Basic info.',
	'profile_tabName_change_password': 'Change password',
	'profile_tabName_other': 'Other',

	'profile_old_password': 'Old password',
	'profile_new_password': 'New password',
	'profile_logout': 'Bye~',
	'profile_logout_btn': 'Logout',
	'profile_other_title': 'DMS 1.0.0 version',
	'profile_other_p1':
		'Account {{createTime}} is registered, thank you for using it!',
	'profile_other_feedback': 'Comments...',
	'profile_other_send_feedback': 'Send feedback',
};
