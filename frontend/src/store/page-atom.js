import { atom } from 'recoil';
import { getLatestState, localStorage } from '@/utils';

export const defaultPageState = {
	// interface language, default is Kazakh
	locale: 'kkKZ',
};

const [isValid, state] = getLatestState(
	localStorage.get('page', {}),
	defaultPageState,
);

// The data in LocalStorage is not as expected
if (!isValid) {
	localStorage.set('page', state);
}

export const pageAtom = atom({
	key: 'pageAtom',
	// default value, aka initial value
	default: state,
});
