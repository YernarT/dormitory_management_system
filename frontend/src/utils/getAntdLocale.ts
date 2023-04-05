import type { allowedLocale } from '@/i18n';

import kkKZ from 'antd/lib/locale/kk_KZ';
import enUS from 'antd/lib/locale/en_US';

export default function getAntdLocale(locale: allowedLocale) {
	switch (locale) {
		case 'enUS':
			return enUS;

		case 'kkKZ':
		default:
			return kkKZ;
	}
}
