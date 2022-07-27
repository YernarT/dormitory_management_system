import type { UserProperties } from '@/types/user';

import { Schema, model } from 'mongoose';

const userScheme = new Schema<UserProperties>({
	fullname: {
		required: true,
		type: String,
	},

	password: {
		required: true,
		type: String,
	},

	role: {
		required: true,
		type: String,
	},

	gender: {
		required: true,
		type: Boolean,
	},

	// timestamps: true,
});

const UserModel = model<UserProperties>('User', userScheme);

export default UserModel;
