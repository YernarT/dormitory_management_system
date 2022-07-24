// React & 周边库
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';

// 业务库
import { useRequest } from 'ahooks';
// API
import { reqLogin } from '@/service/api/auth-api';
import { localStorage } from '@/utils';

// 组件
import { Form, Input, message as antdMessage } from 'antd';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { AuthLayout } from '@/components/layout';

export default function LoginPage() {
	const { t } = useTranslation();
	const history = useHistory();
	const setUser = useSetRecoilState(userAtom);

	const translatedText = {
		login: t('auth_login'),
		or: t('auth_or'),
		register: t('auth_register'),
	};

	const { runAsync: runReqLogin, loading: loadingReqLogin } = useRequest(
		data => reqLogin(data),
		{
			manual: true,
		},
	);

	const onFinish = (values: any) => {
		runReqLogin(values)
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
		<AuthLayout scenes="LOGIN" submitLoading={false}>
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
				<Input type="email" prefix={<AiOutlineMail />} placeholder="Email" />
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
					prefix={<AiOutlineLock />}
					type="password"
					placeholder={t('auth_password')}
				/>
			</Form.Item>
		</AuthLayout>
	);
}
