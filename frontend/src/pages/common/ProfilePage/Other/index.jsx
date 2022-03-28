import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom, defaultUserState } from '@/store';
import { useSafeState } from 'ahooks';

import { localStorage } from '@/utils';

import { Button, Card, Divider, Input, message as antdMessage } from 'antd';

const { TextArea } = Input;

export default function Other() {
	const setUser = useSetRecoilState(userAtom);
	const [comment, setComment] = useSafeState('');

	const handleLogout = () => {
		antdMessage.info('Cау болыңыз~');

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
		<Card title="ЖБЖ 1.0.0 нұсқа">
			<p>Есептік жазба 2022.03.18 тіркелген, пайдаланғаныңыз үшін рахмет!</p>

			<TextArea
				placeholder="Пікірлер..."
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
				Пікір қалдыру
			</Button>

			<Divider />

			<Button
				type="primary"
				danger
				className="logout-btn"
				block
				onClick={handleLogout}>
				Шығу
			</Button>
		</Card>
	);
}
