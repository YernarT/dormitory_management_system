import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom, defaultUserState } from '@/store';

import { localStorage } from '@/utils';

import { Button, Card, Divider, Input, message as antdMessage } from 'antd';

const { TextArea } = Input;

export default function Other() {
	const setUser = useSetRecoilState(userAtom);

	const handleLogout = () => {
		antdMessage.info('Cау болыңыз~');

		localStorage.set('user', defaultUserState);
		setUser(defaultUserState);
	};

	return (
		<Card title="ЖБЖ 1.0.0 нұсқа">
			<p>Есептік жазба 2022.03.18 тіркелген, пайдаланғаныңыз үшін рахмет!</p>

			<TextArea
				placeholder="Пікірлер..."
				minLength={20}
				maxLength={254}
				showCount
			/>

			<Button type="primary" block style={{ marginTop: '10px' }}>
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
