import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userAtom, pageAtom } from '@/store';

import { useRequest, useMount, useSafeState } from 'ahooks';

import {
	reqFeedbacks,
	reqDeleteFeedback,
	reqDeleteAllFeedback,
} from '@/service/api/site-admin-api';
import { fromNow } from '@/utils';

import {
	message as antdMessage,
	Empty,
	Card,
	Skeleton,
	Button,
	message,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { FeedbackStyledBox } from './style';

export default function Feedback() {
	const setUser = useSetRecoilState(userAtom);
	const page = useRecoilValue(pageAtom);

	const [feedbacks, setFeedbacks] = useSafeState([]);

	const { runAsync: runReqFeedbacks, loading: loadingReqFeedbacks } =
		useRequest(reqFeedbacks, {
			manual: true,
		});

	useMount(() => {
		runReqFeedbacks()
			.then(({ feedbacks }) => setFeedbacks(feedbacks))
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	});

	// Delete Feedback
	const { runAsync: runReqDeleteFeedback } = useRequest(
		id => reqDeleteFeedback(id),
		{
			manual: true,
			throttleWait: 500,
		},
	);

	const handleDeleteFeedback = id => {
		runReqDeleteFeedback(id)
			.then(({ message }) => {
				antdMessage.success(message);
				setFeedbacks(prevState =>
					prevState.filter(feedback => feedback.id !== id),
				);
			})
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	};

	// Delete  All Feedback
	const {
		runAsync: runReqDeleteAllFeedback,
		loading: loadingReqDeleteAllFeedback,
	} = useRequest(() => reqDeleteAllFeedback(), {
		manual: true,
	});

	const handleDeleteAllFeedback = () => {
		runReqDeleteAllFeedback()
			.then(({ message }) => {
				antdMessage.success(message);
				setFeedbacks([]);
			})
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	};

	return (
		<FeedbackStyledBox hasFeedback={Boolean(feedbacks.length)}>
			<div className="head">
				<h2 className="title">Кері байланыстар</h2>
				<Button
					type="danger"
					onClick={handleDeleteAllFeedback}
					loading={loadingReqDeleteAllFeedback}>
					<DeleteOutlined />
					<span>Барлығын жою</span>
				</Button>
			</div>

			<div className="feedbacks">
				{feedbacks.length ? (
					feedbacks.map(feedback => (
						<Card key={feedback.id} className="feedback">
							<Skeleton loading={loadingReqFeedbacks} active>
								<DeleteOutlined
									className="delete-btn"
									onClick={() => handleDeleteFeedback(feedback.id)}
								/>
								<p>
									Жіберуші:{' '}
									{feedback.sender
										? feedback.sender.fullname
										: 'Жойылған пайдаланушы'}
								</p>
								<p>Мазмқны: {feedback.content}</p>
								<p>
									Жіберген уакыты:{' '}
									{fromNow(feedback.create_time, {
										lang: page.locale,
										suffix: true,
									})}
								</p>
								{feedback.id}
							</Skeleton>
						</Card>
					))
				) : (
					<Empty />
				)}
			</div>
		</FeedbackStyledBox>
	);
}
