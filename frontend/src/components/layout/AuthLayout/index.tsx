// 类型
import type { FormProps } from 'antd';
import type { FlattenSimpleInterpolation } from 'styled-components';

// React & 周边库
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';

// 业务库
import { useCreation } from 'ahooks';

// 组件
import { Form, Button, Typography, Divider } from 'antd';
import { GuestLayout } from '@/components/layout';
// 样式组件
import { AuthLayoutStyled } from './style';

interface AuthLayoutProps {
	children: React.ReactElement | React.ReactElement[];
	scenes: 'LOGIN' | 'REGISTER';
	submitLoading: boolean;
	customStyle?: FlattenSimpleInterpolation;
}

export default function AuthLayout({
	children,
	scenes,
	submitLoading,
	customStyle,
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
		<GuestLayout>
			<AuthLayoutStyled
				scrollToFirstError
				validateTrigger="onBlur"
				hideRequiredMark
				{...antdFormProps}
				customStyle={customStyle}>
				<Typography.Title className="title">
					{scenes === 'LOGIN' && translatedText.login}
					{scenes === 'REGISTER' && translatedText.register}
				</Typography.Title>

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
			</AuthLayoutStyled>
		</GuestLayout>
	);
}
