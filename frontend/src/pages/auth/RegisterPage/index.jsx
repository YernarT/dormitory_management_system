import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthLayout } from '@/layout';

import './index.less';

export default function RegisterPage() {
	const { t } = useTranslation();
	const history = useHistory();

	const onFinish = values => {
		console.log('Received values of form: ', values);
	};

	return (
		<AuthLayout>
			<Form className="form" onFinish={onFinish}>
				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							message: 'Email міндетті өріс',
						},
						{
							type: 'email',
							message: 'Email форматы дұрыс емес',
						},
					]}>
					<Input type="email" prefix={<UserOutlined />} placeholder="Email" />
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: 'Құпия сөз міндетті өріс',
						},
						{
							min: 4,
							message: 'Құпия сөз ұзындығы 4-ден кем',
						},
						{
							max: 40,
							message: 'Құпия сөз ұзындығы 40-ден артық',
						},
					]}>
					<Input
						prefix={<LockOutlined />}
						type="password"
						placeholder="Password"
					/>
				</Form.Item>
				<Form.Item
					name="rePassword"
					dependencies={['password']}
					rules={[
						{
							required: true,
							message: 'Құпия сөз міндетті өріс',
						},
						{
							min: 4,
							message: 'Құпия сөз ұзындығы 4-ден кем',
						},
						{
							max: 40,
							message: 'Құпия сөз ұзындығы 254-ден артық',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error('Енгізілген құпия сөздер сәйкес келмейді'),
								);
							},
						}),
					]}>
					<Input
						prefix={<LockOutlined />}
						type="password"
						placeholder="RePassword"
					/>
				</Form.Item>

				<Form.Item>
					<div className="form-footer">
						<Button
							type="primary"
							htmlType="submit"
							className="form-submit-button">
							Тіркелу
						</Button>

						<span>немесе</span>

						<a
							href="/auth/login"
							onClick={e => {
								e.preventDefault();
								history.push(`/auth/login${history.location.search}`);
							}}>
							Кіру
						</a>
					</div>
				</Form.Item>
			</Form>
		</AuthLayout>
	);
}
