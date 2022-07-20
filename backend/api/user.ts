import express from 'express';

const router = express.Router();

interface user {
	_id: string;
	username: string;
	password: string;
	createTime: Date;
}
let users: user[] = [
	{
		_id: '1',
		username: 'Yernar',
		password: 'password',
		createTime: new Date('2022-07-20 22:22'),
	},
	{
		_id: '2',
		username: 'Mukiat',
		password: 'password',
		createTime: new Date('2022-07-20 22:23'),
	},
	{
		_id: '3',
		username: 'Akzhol',
		password: 'password',
		createTime: new Date('2022-07-20 22:24'),
	},
];

// Read Single
router.get('/users/:id', async (req, res) => {
	let userId = req.params.id;
	let user: user | undefined;

	try {
		user = users.find(user => user._id === userId);
	} catch (err) {
		res.status(400).json({ 'message': '资源不存在' });
	}

	if (user) {
		res.status(200).json(user);
	} else {
		res.status(400).json({ 'message': '资源不存在' });
	}
});

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
router.put('/users/:id', async (req, res) => {
	let userId = req.params.id;
	let user: user | undefined;

	try {
		user = users.find(user => user._id === userId);
	} catch (err) {
		res.status(400).json({ 'message': '资源不存在' });
	}

	if (user) {
		users.forEach(eachUser => {
			if (user?._id === eachUser._id) {
				eachUser.username = req.body.username ?? eachUser.username;
				eachUser.password = req.body.password ?? eachUser.password;
			}
		});

		res.status(200).json(user);
	} else {
		res.status(400).json({ 'message': '资源不存在' });
	}
});

// Delete
router.delete('/users/:id', async (req, res) => {
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
