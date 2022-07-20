import express from 'express';

const router = express.Router();

interface user {
	_id: string;
	username: string;
	password: string;
	createTime: Date;
}
let users: user[] = [];

// Read
router.get('/users', async (_, res) => {
	res.status(200).json(users);
});

// Create
router.post('/users', async (req, res) => {
	const user = {
		_id: (users.length + 1).toString(),
		username: req.body.username,
		password: req.body.password,
		createTime: new Date(Date.now()),
	};

	users.push(user);

	res.status(201).json(user);
});

// Update
router.put('/articles/:id', async (req, res) => {
	let userId = req.params.id;
	let user;

	try {
		user = users.find(user => user._id === userId);
	} catch (err) {
		res.status(400).json({ 'message': '资源不存在' });
	}

	if (user) {
		user.username = req.body.username ?? user.username;
		user.password = req.body.password ?? user.password;
		// 伪代码

		res.status(200).json(user);
	} else {
		res.status(400).json({ 'message': '资源不存在' });
	}
});

// Delete
router.delete('/articles/:id', async (req, res) => {
	let userId = req.params.id;
	let user;

	try {
		user = users.find(user => user._id === userId);
	} catch (err) {
		res.status(400).json({ 'message': '资源不存在' });
	}

	if (user) {
		users = users.filter(user => user._id !== userId);

		res.status(200).json({});
	} else {
		res.status(400).json({ 'message': '资源不存在' });
	}
});

export default router;
