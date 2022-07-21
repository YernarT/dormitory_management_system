// 类型
import type { allowedLocale } from '@/i18n';

import { atom } from 'recoil';
import { localStorage } from '@/utils';

export interface pageStateProperties {
	locale: allowedLocale;
}

export const defaultPageState: pageStateProperties = {
	// interface language, default is Kazakh
	locale: 'kkKZ',
};

const state = localStorage.get('page', defaultPageState);

export const pageAtom = atom({
	key: 'pageAtom',
	// default value, aka initial value
	default: state,
});
