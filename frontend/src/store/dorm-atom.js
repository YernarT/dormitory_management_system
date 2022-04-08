import { atom } from 'recoil';
import { getLatestState, localStorage } from '@/utils';

export const defaultDormState = {
	// interface language, default is Kazakh
	organization: null,
};

const [isValid, state] = getLatestState(
	localStorage.get('dorm', {}),
	defaultDormState,
);

// The data in LocalStorage is not as expected
if (!isValid) {
	localStorage.set('dorm', state);
}

export const dormAtom = atom({
	key: 'dormAtom',
	// default value, aka initial value
	default: state,
});
