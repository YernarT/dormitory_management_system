import type { UserProperties } from '@/types/user';

import express from 'express';
import { connect } from 'mongoose';
import { UserModel } from '@/db';
import { MODE, DEV_DATABASE_URL, PROD_DATABASE_URL } from '@/config';

const router = express.Router();

// 获取 单一用户
router.get('/users/:id', async (req, res) => {
	let userId = req.params.id;
	let user: UserProperties | undefined | null;

	try {
		await connect(
			MODE === 'development' ? DEV_DATABASE_URL : PROD_DATABASE_URL,
		).catch(err => {
			console.log('数据库链接异常: ', err);
			return res.status(500).json({ 'message': '服务器崩溃' });
		});

		user = await UserModel.findById(userId);
	} catch (err) {
		return res.status(400).json({ 'message': '资源不存在' });
	}

	if (user) {
		return res.status(200).json(user);
	} else {
		return res.status(400).json({ 'message': '资源不存在' });
	}
});

// 获取 用户集合
router.get('/users', async (_, res) => {
	let users: UserProperties[] = [];

	try {
		await connect(
			MODE === 'development' ? DEV_DATABASE_URL : PROD_DATABASE_URL,
		).catch(err => {
			console.log('数据库链接异常: ', err);
			return res.status(500).json({ 'message': '服务器崩溃' });
		});

		users = await UserModel.find();
	} catch (err) {
		return res.status(500).json({ 'message': '服务器崩溃' });
	}

	return res.status(200).json({ 'users': users });
});

// // Create
// router.post('/users', async (req, res) => {
// 	const user = {
// 		_id: (users.length + 1).toString(),
// 		username: req.body.username,
// 		password: req.body.password,
// 		createTime: new Date(Date.now()),
// 	};

// 	users.push(user);

// 	res.status(201).json(user);
// });

// // Update
// router.put('/users/:id', async (req, res) => {
// 	let userId = req.params.id;
// 	let user: user | undefined;

// 	try {
// 		user = users.find(user => user._id === userId);
// 	} catch (err) {
// 		res.status(400).json({ 'message': '资源不存在' });
// 	}

// 	if (user) {
// 		users.forEach(eachUser => {
// 			if (user?._id === eachUser._id) {
// 				eachUser.username = req.body.username ?? eachUser.username;
// 				eachUser.password = req.body.password ?? eachUser.password;
// 			}
// 		});

// 		res.status(200).json(user);
// 	} else {
// 		res.status(400).json({ 'message': '资源不存在' });
// 	}
// });

// // Delete
// router.delete('/users/:id', async (req, res) => {
// 	let userId = req.params.id;
// 	let user;

// 	try {
// 		user = users.find(user => user._id === userId);
// 	} catch (err) {
// 		res.status(400).json({ 'message': '资源不存在' });
// 	}

// 	if (user) {
// 		users = users.filter(user => user._id !== userId);

// 		res.status(200).json({});
// 	} else {
// 		res.status(400).json({ 'message': '资源不存在' });
// 	}
// });

export default router;
