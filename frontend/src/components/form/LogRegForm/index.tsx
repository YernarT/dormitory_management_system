// 类型
import type { FormProps } from 'antd';

// React & 周边库
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// 业务库
import { useCreation } from 'ahooks';

// Antd 组件
import { Form, Button, Divider } from 'antd';

// Scoped style
import classes from './style.module.scss';

interface AuthLayoutProps {
	children: React.ReactElement | React.ReactElement[];
	scenes: 'LOGIN' | 'REGISTER';
	submitLoading: boolean;
}

export default function LogRegForm({
	children,
	scenes,
	submitLoading,
	...antdFormProps
}: AuthLayoutProps & FormProps) {
	const history = useHistory();
	const { t } = useTranslation();
	const translatedText = {
		login: t('auth_login'),
		or: t('auth_or'),
		register: t('auth_register'),
	};

	// 底部跳转链接地址
	const footerJumpLink = useCreation(() => {
		if (scenes === 'LOGIN') {
			return '/auth/register';
		}

		if (scenes === 'REGISTER') {
			return '/auth/login';
		}

		return history.location.pathname;
	}, [scenes]);

	return (
		<Form
			scrollToFirstError
			validateTrigger="onBlur"
			{...antdFormProps}
			className={classes.logRegForm}>
			<h3 className="title">
				{scenes === 'LOGIN' && translatedText.login}
				{scenes === 'REGISTER' && translatedText.register}
			</h3>

			{children}

			<Form.Item className="last-form-item">
				<div className="form-footer">
					<Button
						block
						type="primary"
						htmlType="submit"
						className="form-submit-button"
						loading={submitLoading}>
						{scenes === 'LOGIN' && translatedText.login}
						{scenes === 'REGISTER' && translatedText.register}
					</Button>

					<Divider plain className="divider">
						{translatedText.or}
					</Divider>

					<a
						href={footerJumpLink}
						onClick={e => {
							e.preventDefault();
							history.push(footerJumpLink);
						}}>
						{scenes === 'LOGIN' && translatedText.register}
						{scenes === 'REGISTER' && translatedText.login}
					</a>
				</div>
			</Form.Item>
		</Form>
	);
}
