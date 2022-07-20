// 类型
import type { Express } from 'express';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRouter from './api/user';

const app: Express = express();

app
	.use(cors())
	.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json());

app.use('/api', userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
	console.log(`⚡️[server]: Server is running at port: ${PORT}`),
);
