import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAtom, defaultUserState, pageAtom } from '@/store';
import { useSafeState, useCreation } from 'ahooks';
import { useTranslation } from 'react-i18next';

import { localStorage, fromNow } from '@/utils';

import { Button, Card, Divider, Input, message as antdMessage } from 'antd';

const { TextArea } = Input;

export default function Other() {
	const { t } = useTranslation();
	const [{ createTime }, setUser] = useRecoilState(userAtom);
	const page = useRecoilValue(pageAtom);
	const [comment, setComment] = useSafeState('');

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

	const handleSendComment = () => {
		let _comment = comment.trim();
		setComment('');

		// 有内容
		if (_comment) {
			console.log(`Comment 内容\n${_comment}`);
			antdMessage.info('Функция қазірше дайын емес...');
		}
	};

	return (
		<Card title={t('profile_other_title')}>
			<p>{t('profile_other_p1', { createTime: createTimeReadableFormat })}</p>

			<TextArea
				placeholder={t('profile_other_comment')}
				maxLength={254}
				showCount
				value={comment}
				onChange={({ target: { value } }) => setComment(value)}
			/>

			<Button
				type="primary"
				block
				style={{ marginTop: '10px' }}
				onClick={handleSendComment}>
				{t('profile_other_send_comment')}
			</Button>

			<Divider />

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
