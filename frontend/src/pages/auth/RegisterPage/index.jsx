import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';
import { useRequest } from 'ahooks';

import { reqRegister } from '@/service/api/auth-api';
import { localStorage } from '@/utils';

import { Form, Input, Radio, Button, message as antdMessage } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { AuthLayout } from '@/layout';

import './index.less';

export default function RegisterPage() {
	const { t } = useTranslation();
	const history = useHistory();
	const setUser = useSetRecoilState(userAtom);

	const { runAsync: runReqRegister, loading: loadingReqRegister } = useRequest(
		data => reqRegister(data),
		{
			manual: true,
		},
	);
	const onFinish = values => {
		let usp = new URLSearchParams(history.location.search);
		switch (usp.get('form')) {
			case 'seek':
				values.role = 'tenant';
				break;
			case 'publish':
				values.role = 'org manager';
				break;
			default:
				values.role = '__unknown';
				break;
		}

		// 不发送 confirm password
		values.rePassword = undefined;

		runReqRegister(values)
			.then(data => {
				let {
					message,
					token,
					user: { email, role, fullname, gender, create_time: createTime, id },
				} = data;
				let newUser = {
					email,
					role,
					fullname,
					gender,
					createTime,
					id,
					token,
				};

				antdMessage.success(message);

				localStorage.set('user', newUser);
				setUser(newUser);

				history.push('/');
			})
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	};

	return (
		<AuthLayout>
			<Form
				className="form"
				onFinish={onFinish}
				scrollToFirstError
				validateTrigger="onBlur"
				hideRequiredMark>
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
					name="gender"
					rules={[{ required: true, message: t('auth_missing_gender') }]}>
					<Radio.Group>
						<Radio value={true}>{t('auth_gender_male')}</Radio>
						<Radio value={false}>{t('auth_gender_female')}</Radio>
					</Radio.Group>
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
					<Input.Password
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
					<Input.Password
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
