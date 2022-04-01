import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/store';
import { useRequest } from 'ahooks';

import { reqEdit } from '@/service/api/common-api';

import { Form, Input, Radio, Button, message as antdMessage } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';

export default function BasicInfo() {
	const { t } = useTranslation();
	const [{ email, fullname, gender }, setUser] = useRecoilState(userAtom);

	const { runAsync: runReqEdit, loading: loadingReqEdit } = useRequest(
		data => reqEdit(data),
		{
			manual: true,
		},
	);
	const onFinish = values => {
		let data = {};
		// 判断是否有修改, 只将修改后的字段加到请求体里
		if (values.email !== email) {
			data.email = values.email;
		}
		if (values.fullname !== fullname) {
			data.fullname = values.fullname;
		}
		if (values.gender !== gender) {
			data.gender = values.gender;
		}

		// 没有任何修改
		if (Object.keys(data).length === 0) {
			antdMessage.success('Өзгеріс сәтті сақталды');
			return;
		}

		runReqEdit(data)
			.then(({ message, user: { email, fullname, gender } }) => {
				antdMessage.success(message);

				setUser(prevState => ({
					...prevState,
					email,
					fullname,
					gender,
				}));
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
			onFinish={onFinish}
			initialValues={{ email, fullname, gender }}
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
				name="fullname"
				rules={[
					{
						required: true,
						message: t('auth_missing_fullname'),
					},
					{
						min: 2,
						message: t('auth_fullname_less_than_rule', {
							postProcess: 'interval',
							min: 2,
						}),
					},
					{
						max: 50,
						message: t('auth_fullname_more_than_rule', {
							postProcess: 'interval',
							max: 50,
						}),
					},
				]}>
				<Input
					type="text"
					prefix={<UserOutlined />}
					placeholder={t('auth_fullname')}
				/>
			</Form.Item>
			<Form.Item
				name="gender"
				rules={[{ required: true, message: t('auth_missing_gender') }]}>
				<Radio.Group>
					<Radio value={true}>{t('auth_gender_male')}</Radio>
					<Radio value={false}>{t('auth_gender_female')}</Radio>
				</Radio.Group>
			</Form.Item>

			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					block
					className="form-submit-button"
					loading={loadingReqEdit}>
					{t('auth_save_changes')}
				</Button>
			</Form.Item>
		</Form>
	);
}
