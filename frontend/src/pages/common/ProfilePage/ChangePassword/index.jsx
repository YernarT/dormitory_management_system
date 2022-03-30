import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';

import { reqChangePassword } from '@/service/api/common-api';

import { Form, Input, Button, message as antdMessage } from 'antd';
import { LockOutlined } from '@ant-design/icons';

export default function ChangePassword() {
	const { t } = useTranslation();
	const setUser = useSetRecoilState(userAtom);

	const { runAsync: runReqChangePassword, loading: loadingReqChangePassword } =
		useRequest(data => reqChangePassword(data), {
			manual: true,
		});
	const onFinish = values => {
		runReqChangePassword(values)
			.then(({ message }) => {
				antdMessage.success(message);
			})
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	};

	return (
		<Form
			className="form"
			onFinish={onFinish}
			validateTrigger="onBlur"
			hideRequiredMark>
			<Form.Item
				name="oldPassword"
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
					placeholder={t('profile_old_password')}
				/>
			</Form.Item>
			<Form.Item
				name="newPassword"
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
					placeholder={t('profile_new_password')}
				/>
			</Form.Item>

			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					block
					className="form-submit-button"
					loading={loadingReqChangePassword}>
					{t('auth_save_changes')}
				</Button>
			</Form.Item>
		</Form>
	);
}
