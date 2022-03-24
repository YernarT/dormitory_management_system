import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthLayout } from '@/layout';

import './index.less';

export default function LoginPage() {
	const { t } = useTranslation();
	const history = useHistory();

	// 初始化 search params
	useEffect(() => {	
		let searchParams = history.location.search;
		if (!searchParams.includes('publish') && !searchParams.includes('seek')) {
			history.replace({ search: '?form=seek' });
		}
	}, []);

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
							message: 'Please input your Email!',
						},
						{
							type: 'email',
							message: '邮箱不对',
						},
					]}>
					<Input type="email" prefix={<UserOutlined />} placeholder="Email" />
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input your Password!',
						},
						{
							min: 4,
							message: '密码min',
						},
						{
							max: 40,
							message: '密码max',
						},
					]}>
					<Input
						prefix={<LockOutlined />}
						type="password"
						placeholder="Password"
					/>
				</Form.Item>

				<Form.Item>
					<div className="form-footer">
						<Button
							type="primary"
							htmlType="submit"
							className="form-submit-button">
							Кіру
						</Button>

						<span>немесе</span>

						<a
							href="/auth/register"
							onClick={e => {
								e.preventDefault();
								history.push(`/auth/register${history.location.search}`);
							}}>
							Тіркелу
						</a>
					</div>
				</Form.Item>
			</Form>
		</AuthLayout>
	);
}
