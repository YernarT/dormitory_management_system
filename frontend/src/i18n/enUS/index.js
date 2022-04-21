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
	backToHome: 'Back to homepage',

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

	'auth_gender': 'Gender',
	'auth_missing_gender': 'Gender is a required field',
	'auth_gender_male': 'Male',
	'auth_gender_female': 'Female',
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
	'profile_tabName_notifications': 'Notification',
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

	// site admin
	'site_admin_tabName_feedback': 'Feedback',
	'site_admin_tabName_city': 'City',
	'site_admin_tabName_statistic': 'Statistic',

	// org manager
	'org_manager_tabName_organization': 'Organization',
	'org_manager_tabName_dormitory_management': 'Dormitory management',
	'org_manager_tabName_room_management': 'Room management',
	'org_manager_tabName_bed_management': 'Bed management',
	'org_manager_tabName_process_request': 'Process request',
	'org_manager_tabName_dormitory_manager': 'Dormitory manager',

	// dorm manager
	'dorm_manager_tabName_dormitory_management': 'Dormitory management',
	'dorm_manager_tabName_room_management': 'Room management',
	'dorm_manager_tabName_bed_management': 'Bed management',
	'dorm_manager_tabName_process_request': 'Process request',

	// tenant
	'tenant_tabName_search_dorm': 'Search dorm',
	'tenant_tabName_info': 'Request',
};
