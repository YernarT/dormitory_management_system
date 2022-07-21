import { generateI18nPluralIntervalRule } from '@/utils';

export default {
	'kkKZ': 'Қазақша',
	'enUS': 'Ағылшынша',

	// common route
	'route_/': 'Жатақхананы Басқару Жүйесі',
	'route_/404': '404 - Жатақхананы Басқару Жүйесі',
	'route_/profile': 'Жеке кабинет - Жатақхананы Басқару Жүйесі',

	// auth route
	'route_/auth/login': 'Кіру - Жатақхананы Басқару Жүйесі',
	'route_/auth/register': 'Тіркелу - Жатақхананы Басқару Жүйесі',

	// Loading
	commonLoadingHelpText: 'Жүктелуде...',
	backToHome: 'Басты бетке оралу',

	// Header
	'header_site_name_short': 'Жатақхананы Басқару Жүйесі',
	'header_publish': 'Жатақхана жариялау',
	'header_seek': 'Жатақхана іздеу',

	// Footer
	'footer_site_name': 'Жатақхананы Басқару Жүйесі',

	// Landing Page
	'landingP_welcome_subTitle':
		'Жоғары оқу орны мен жатақханалы мекемелерге жарамды',

	// Related Auth
	'auth_missing_email': 'Email міндетті өріс',
	'auth_incorrect_format_email': 'Email форматы дұрыс емес',

	'auth_password': 'Құпия сөз',
	'auth_missing_password': 'Құпия сөз міндетті өріс',
	'auth_password_less_than_rule': generateI18nPluralIntervalRule({
		'0-inf': 'Құпия сөз ұзындығы {{ min }}-ден кем',
	}),
	'auth_password_more_than_rule': generateI18nPluralIntervalRule({
		'0-inf': 'Құпия сөз ұзындығы {{ max }}-ден артық',
	}),
	'auth_rePassword': 'Құпия сөз қайталау',
	'auth_rePassword_noMatch': 'Енгізілген құпия сөздер сәйкес келмейді',
	'auth_or': 'немесе',

	'auth_register': 'Тіркелу',
	'auth_login': 'Кіру',

	'auth_gender': 'Жыныс',
	'auth_missing_gender': 'Жыныс міндетті өріс',
	'auth_gender_male': 'Ер',
	'auth_gender_female': 'Әйел',
	'auth_fullname': 'Аты-жөн',
	'auth_missing_fullname': 'Аты-жөн міндетті өріс',
	'auth_fullname_less_than_rule': generateI18nPluralIntervalRule({
		'0-inf': 'Аты-жөн ұзындығы {{ min }}-ден кем',
	}),
	'auth_fullname_more_than_rule': generateI18nPluralIntervalRule({
		'0-inf': 'Аты-жөн ұзындығы {{ max }}-ден артық',
	}),
	'auth_save_changes': 'Өзгерісті сақтау',

	// Profile
	'profile_tabName_basic_infomation': 'Негізгі инфо.',
	'profile_tabName_change_password': 'Құпия сөзді өзгерту',
	'profile_tabName_notifications': 'Хабарлама',
	'profile_tabName_other': 'Басқа',

	'profile_old_password': 'Ескі кұпия сөз',
	'profile_new_password': 'Жаңа кұпия сөз',
	'profile_logout': 'Cаубол~',
	'profile_logout_btn': 'Шығу',
	'profile_other_title': 'Жатақхананы Басқару Жүйесі 1.0.0 нұсқа',
	'profile_other_p1':
		'Есептік жазба {{ createTime }} тіркелген, пайдаланғаныңыз үшін рахмет!',
	'profile_other_feedback': 'Пікірлер...',
	'profile_other_send_feedback': 'Пікір қалдыру',

	// site admin
	'site_admin_tabName_feedback': 'Кері байланыс',
	'site_admin_tabName_city': 'Қала',
	'site_admin_tabName_statistic': 'Статистика',

	// org manager
	'org_manager_tabName_organization': 'Ұйым',
	'org_manager_tabName_dormitory_management': 'Жатақхананы басқару',
	'org_manager_tabName_room_management': 'Бөлме басқару',
	'org_manager_tabName_bed_management': 'Төсек орын басқару',
	'org_manager_tabName_process_request': 'Өтінішті өңдеу',
	'org_manager_tabName_dormitory_manager': 'Жатақ басқарушы',

	// dorm manager
	'dorm_manager_tabName_dormitory_management': 'Жатақхананы басқару',
	'dorm_manager_tabName_room_management': 'Бөлме басқару',
	'dorm_manager_tabName_bed_management': 'Төсек орын басқару',
	'dorm_manager_tabName_process_request': 'Өтінішті өңдеу',

	// tenant
	'tenant_tabName_search_dorm': 'Жатақхана іздеу',
	'tenant_tabName_info': 'Өтініш',
};
