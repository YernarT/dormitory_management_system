import kkKZ from 'antd/lib/locale/kk_KZ';
import enUS from 'antd/lib/locale/en_US';

import moment from 'moment';
import 'moment/locale/kk';
import 'moment/locale/en-nz';

export default function getAntdLocale(locale) {
	switch (locale) {
		case 'enUS':
			moment.locale('en-nz');
			return enUS;
		default:
			moment.locale('kk');
			return kkKZ;
	}
}
