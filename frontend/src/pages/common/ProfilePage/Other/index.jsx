import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAtom, defaultUserState, pageAtom } from '@/store';
import { useSafeState, useCreation, useRequest } from 'ahooks';
import { useTranslation } from 'react-i18next';

import { localStorage, fromNow } from '@/utils';
import { reqSendFeedback } from '@/service/api/common-api';

import { Button, Card, Divider, Input, message as antdMessage } from 'antd';

const { TextArea } = Input;

export default function Other() {
	const { t } = useTranslation();
	const [{ createTime, role }, setUser] = useRecoilState(userAtom);
	const page = useRecoilValue(pageAtom);
	const [feedbackContent, setFeedbackContent] = useSafeState('');

	const createTimeReadableFormat = useCreation(
		() =>
			fromNow(createTime, {
				lang: page.locale,
				suffix: true,
			}),
		[createTime, page.locale],
	);

	const handleLogout = () => {
		antdMessage.info(t('profile_logout'));

		localStorage.set('user', defaultUserState);
		setUser(defaultUserState);
	};

	const { runAsync: runReqSendFeedback, loading: loadingReqSendFeedback } =
		useRequest(data => reqSendFeedback(data), {
			manual: true,
		});

	const handleSendFeedback = () => {
		let data = feedbackContent.trim();

		// 有内容
		if (data) {
			runReqSendFeedback({ content: data })
				.then(({ message }) => {
					antdMessage.success(message);
					setFeedbackContent('');
				})
				.catch(({ message, needExecuteLogout, initialUser }) => {
					antdMessage.error(message);

					if (needExecuteLogout) {
						setUser(initialUser);
					}
				});
		}
	};

	return (
		<Card title={t('profile_other_title')}>
			<p>{t('profile_other_p1', { createTime: createTimeReadableFormat })}</p>

			{role !== 'site admin' && (
				<>
					<TextArea
						placeholder={t('profile_other_feedback')}
						maxLength={254}
						showCount
						value={feedbackContent}
						onChange={({ target: { value } }) => setFeedbackContent(value)}
					/>

					<Button
						type="primary"
						block
						style={{ marginTop: '10px' }}
						onClick={handleSendFeedback}
						loading={loadingReqSendFeedback}>
						{t('profile_other_send_feedback')}
					</Button>

					<Divider />
				</>
			)}

			<Button
				type="primary"
				danger
				className="logout-btn"
				block
				onClick={handleLogout}>
				{t('profile_logout_btn')}
			</Button>
		</Card>
	);
}
