import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';
import { useRequest } from 'ahooks';

import { reqRegister } from '@/service/api/auth-api';
import { localStorage } from '@/utils';

import { Form, Input, Button, message as antdMessage } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { AuthLayout } from '@/layout';

import './index.less';

export default function RegisterPage() {
	const { t } = useTranslation();
	const history = useHistory();
	const setUser = useSetRecoilState(userAtom);

	// 初始化 search params
	useEffect(() => {
		let searchParams = history.location.search;
		if (!searchParams.includes('publish') && !searchParams.includes('seek')) {
			history.replace({ search: '?form=seek' });
		}
	}, []);

	const { runAsync: runReqRegister, loading: loadingReqRegister } = useRequest(
		data => reqRegister(data),
		{
			manual: true,
		},
	);
	const onFinish = values => {
		if (history.location.search.includes('seek')) {
			values.role = 'tenant';
		} else {
			values.role = 'dorm manager';
		}
		// 不发送 confirm password
		values.rePassword = undefined;

		runReqRegister(values)
			.then(data => {
				let {
					message,
					token,
					user: { email, role, fullname, create_time: createTime, id },
				} = data;
				let newUser = {
					email,
					role,
					fullname,
					create_time: createTime,
					id,
					token,
				};

				antdMessage.success(message);

				localStorage.set('user', newUser);
				setUser(newUser);

				history.push('/');
			})
			.catch(err => {
				antdMessage.error(err.message);
			});
	};

	return (
		<AuthLayout>
			<Form className="form" onFinish={onFinish}>
				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							message: t('auth_missing_email'),
						},
						{
							type: 'email',
							message: t('auth_incorrect_format_email'),
						},
					]}>
					<Input type="email" prefix={<MailOutlined />} placeholder="Email" />
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: t('auth_missing_password'),
						},
						{
							min: 4,
							message: t('auth_password_less_than_rule', {
								postProcess: 'interval',
								min: 4,
							}),
						},
						{
							max: 40,
							message: t('auth_password_more_than_rule', {
								postProcess: 'interval',
								max: 40,
							}),
						},
					]}>
					<Input
						prefix={<LockOutlined />}
						type="password"
						placeholder={t('auth_password')}
					/>
				</Form.Item>
				<Form.Item
					name="rePassword"
					dependencies={['password']}
					rules={[
						{
							required: true,
							message: t('auth_missing_password'),
						},
						{
							min: 4,
							message: t('auth_password_less_than_rule', {
								postProcess: 'interval',
								min: 4,
							}),
						},
						{
							max: 40,
							message: t('auth_password_more_than_rule', {
								postProcess: 'interval',
								max: 40,
							}),
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error(t('auth_rePassword_noMatch')));
							},
						}),
					]}>
					<Input
						prefix={<LockOutlined />}
						type="password"
						placeholder={t('auth_rePassword')}
					/>
				</Form.Item>

				<Form.Item>
					<div className="form-footer">
						<Button
							type="primary"
							htmlType="submit"
							className="form-submit-button"
							loading={loadingReqRegister}>
							{t('auth_register')}
						</Button>

						<span>{t('auth_or')}</span>

						<a
							href="/auth/login"
							onClick={e => {
								e.preventDefault();
								history.push(`/auth/login${history.location.search}`);
							}}>
							{t('auth_login')}
						</a>
					</div>
				</Form.Item>
			</Form>
		</AuthLayout>
	);
}
