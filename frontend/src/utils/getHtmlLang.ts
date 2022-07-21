import type { allowedLocale } from '@/i18n';

export default function getHtmlLang(locale: allowedLocale) {
	switch (locale) {
		case 'enUS':
			return 'en';

		case 'kkKZ':
		default:
			return 'kk';
	}
}
