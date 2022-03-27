import { generateI18nPluralIntervalRule } from '@/utils';

export default {
	'kkKZ': 'Қазақша',
	'enUS': 'Ағылшынша',

	// common route
	'route_/': 'Жатақхананы Басқару Жүйесі',
	'route_/404': '404 - ЖБЖ',
	'route_/profile': 'Жеке кабинет - ЖБЖ',

	// auth route
	'route_/auth/login': 'Кіру - ЖБЖ',
	'route_/auth/register': 'Тіркелу - ЖБЖ',

	// Loading
	commonLoadingHelpText: 'Жүктелуде...',

	// Header
	'header_site_name_short': 'ЖБЖ',
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

	'auth_fullname': 'Аты-жөн',
	'auth_missing_fullname': 'Аты-жөн міндетті өріс',
	'auth_fullname_less_than_rule': generateI18nPluralIntervalRule({
		'0-inf': 'Аты-жөн ұзындығы {{ min }}-ден кем',
	}),
	'auth_fullname_more_than_rule': generateI18nPluralIntervalRule({
		'0-inf': 'Аты-жөн ұзындығы {{ max }}-ден артық',
	}),
	'auth_save_changes': 'Өзгерісті сақтау',
};
