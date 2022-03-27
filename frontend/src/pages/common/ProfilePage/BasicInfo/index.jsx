import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/store';
import { useRequest } from 'ahooks';

import { reqEdit } from '@/service/api/common-api';

import { Form, Input, Button, message as antdMessage } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { BasicInfoStyledBox } from './style';

export default function BasicInfo() {
	const { t } = useTranslation();
	const [user, setUser] = useRecoilState(userAtom);

	const { runAsync: runReqEdit, loading: loadingReqEdit } = useRequest(
		data => reqEdit(data),
		{
			manual: true,
		},
	);
	const onFinish = values => {
		let data = {};
		// 判断是否有修改
		if (values.email !== user.email) {
			data.email = values.email;
		}
		if (values.fullname !== user.fullname) {
			data.fullname = values.fullname;
		}

		// 没有任何修改
		if (Object.keys(data).length === 0) {
			antdMessage.success('Өзгеріс сәтті сақталды');
			return;
		}

		runReqEdit(data)
			.then(({ message, user: { email, fullname } }) => {
				antdMessage.success(message);

				setUser(prevState => ({
					...prevState,
					email,
					fullname,
				}));
			})
			.catch(err => {
				antdMessage.error(err.message);
			});
	};

	return (
		<BasicInfoStyledBox
			onClick={() => {
				console.log(user);
			}}>
			<Form
				className="form"
				onFinish={onFinish}
				initialValues={{ email: user.email, fullname: user.fullname }}>
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
							message: t('auth_missing_email'),
						},
						{ min: 4, message: '最小限制' },
						{ max: 50, message: '最大限制' },
					]}>
					<Input type="text" prefix={<UserOutlined />} placeholder="Fullname" />
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="form-submit-button"
						loading={loadingReqEdit}>
						Өзгерісті сақтау
					</Button>
				</Form.Item>
			</Form>
		</BasicInfoStyledBox>
	);
}
