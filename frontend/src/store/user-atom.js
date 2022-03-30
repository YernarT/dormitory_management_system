import { atom } from 'recoil';
import { getLatestState, localStorage } from '@/utils';

export const defaultUserState = {
	email: '',
	role: 'guest',
	gender: null,
	fullname: '',
	createTime: null,
	id: -1,
	token: '',
};

const [isValid, state] = getLatestState(
	localStorage.get('user', {}),
	defaultUserState,
);

// The data in LocalStorage is not as expected
if (!isValid) {
	localStorage.set('user', state);
}

export const userAtom = atom({
	key: 'userAtom',
	// default value, aka initial value
	default: state,
});
