import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';
import { useRequest } from 'ahooks';

import { reqLogin } from '@/service/api/auth-api';
import { localStorage } from '@/utils';

import { Form, Input, Button, message as antdMessage } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthLayout } from '@/layout';

import './index.less';

export default function LoginPage() {
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

	const { runAsync: runReqLogin, loading: loadingReqLogin } = useRequest(
		data => reqLogin(data),
		{
			manual: true,
		},
	);

	const onFinish = values => {
		runReqLogin(values)
			.then(data => {
				console.log(data);
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
					<Input type="email" prefix={<UserOutlined />} placeholder="Email" />
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
							message: t('auth_password_less_than_rule'),
						},

						/**
						 * TODO:
						 *
						 * min, max 限制 翻译 使用变量
						 */

						{
							max: 40,
							message: t('auth_password_more_than_rule'),
						},
					]}>
					<Input
						prefix={<LockOutlined />}
						type="password"
						placeholder={t('auth_password')}
					/>
				</Form.Item>

				<Form.Item>
					<div className="form-footer">
						<Button
							type="primary"
							htmlType="submit"
							className="form-submit-button"
							loading={loadingReqLogin}>
							{t('auth_login')}
						</Button>

						<span>{t('auth_or')}</span>

						<a
							href="/auth/register"
							onClick={e => {
								e.preventDefault();
								history.push(`/auth/register${history.location.search}`);
							}}>
							{t('auth_register')}
						</a>
					</div>
				</Form.Item>
			</Form>
		</AuthLayout>
	);
}
