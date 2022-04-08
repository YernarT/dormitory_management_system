import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userAtom, pageAtom } from '@/store';

import { useRequest, useMount, useSetState } from 'ahooks';
// import { reqNotifications } from '@/service/api/common-api';
import { fromNow } from '@/utils';

import { message as antdMessage, Empty, Card, Skeleton, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { NotificationsStyledBox } from './style';

export default function Notifications() {
	const setUser = useSetRecoilState(userAtom);
	const page = useRecoilValue(pageAtom);

	const [state, setState] = useSetState({
		notifications: [],
	});

	const { runAsync: runReqNotifications, loading: loadingReqNotifications } =
		useRequest(() => {}, {
			manual: true,
		});

	useMount(() => {
		runReqNotifications()
			.then(({ notifications }) => setState({ notifications }))
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	});

	// const {
	// 	runAsync: runReqDeleteAllFeedback,
	// 	loading: loadingReqDeleteAllFeedback,
	// } = useRequest(() => reqDeleteAllFeedback(), {
	// 	manual: true,
	// });

	const handleDeleteAllFeedback = () => {
		// runReqDeleteAllFeedback()
		// 	.then(({ message }) => {
		// 		antdMessage.success(message);
		// 		setFeedbacks([]);
		// 	})
		// 	.catch(({ message, needExecuteLogout, initialUser }) => {
		// 		antdMessage.error(message);
		// 		if (needExecuteLogout) {
		// 			setUser(initialUser);
		// 		}
		// 	});
	};

	return (
		<NotificationsStyledBox>
			<div className="head">
				<h2 className="title">Хабарламалар</h2>
				<Button
					type="danger"
					onClick={handleDeleteAllFeedback}
					// loading={loadingReqDeleteAllFeedback}
				>
					<DeleteOutlined />
					<span>Барлығын жою</span>
				</Button>
			</div>

			<div className="feedbacks">
				{state.notifications.length ? (
					state.notifications.map(notification => (
						<Card key={notification.id} className="notification">
							<Skeleton loading={false} active>
								<DeleteOutlined
									className="delete-btn"
									// onClick={() => handleDeleteFeedback(feedback.id)}
								/>
								<p>
									Жіберуші:{' '}
									{notification.sender
										? notification.sender.fullname
										: 'Жойылған пайдаланушы'}
								</p>
								<p>Мазмқны: {notification.content}</p>
								<p>
									Жіберген уакыты:{' '}
									{fromNow(notification.create_time, {
										lang: page.locale,
										suffix: true,
									})}
								</p>
								{notification.id}
							</Skeleton>
						</Card>
					))
				) : (
					<Empty description="Хабарламалар жоқ" />
				)}
			</div>
		</NotificationsStyledBox>
	);
}
