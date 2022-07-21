// 类型
import { allowedRole } from '@/utils';

import { atom } from 'recoil';
import { localStorage, role } from '@/utils';

export interface userStateProperties {
	email: string;
	role: allowedRole;
	gender: boolean;
	fullname: string;
	createTime: Date | null;
	_id: string;
	token: string;
}

export const defaultUserState: userStateProperties = {
	email: '',
	role: role.GUEST,
	gender: false,
	fullname: '',
	createTime: null,
	_id: '',
	token: '',
};

const state = localStorage.get('user', defaultUserState);

export const userAtom = atom({
	key: 'userAtom',
	// default value, aka initial value
	default: state,
});
