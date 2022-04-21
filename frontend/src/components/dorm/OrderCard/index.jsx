import React, { memo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { pageAtom, userAtom } from '@/store';

import { useRequest } from 'ahooks';
import { reqHandleOrderResult } from '@/service/api/org-manager-api';
import { fromNow } from '@/utils';

import {
	Card,
	Skeleton,
	Descriptions,
	Empty,
	Space,
	Button,
	message as antdMessage,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { RequestCard } from '@/components/dorm';
import { OrderCardStyledBox } from './style';

export default memo(function OrderCard({
	order,
	loading,
	showDeleteBtn = true,
	handleDelete,
	afterHandleResult,
}) {
	const setUser = useSetRecoilState(userAtom);
	const page = useRecoilValue(pageAtom);

	const durationChange = duration => {
		if (duration === 'month') {
			return 'Ай';
		}
		if (duration === 'year') {
			return 'Жыл';
		}
	};

	// 处理Order状态的请求
	const { runAsync: runHanldeOrderResult, loading: loadingHanleOrderResult } =
		useRequest(data => reqHandleOrderResult(data), {
			manual: true,
			throttleWait: 300,
		});

	// 处理Order状态
	const handleOrderResult = (solution, orderId) => {
		runHanldeOrderResult({ solution, orderId })
			.then(({ message, orders }) => {
				antdMessage.success(message);
				afterHandleResult(orders);
			})
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	};

	return (
		<OrderCardStyledBox showDeleteBtn={showDeleteBtn}>
			<Card>
				<Skeleton loading={loading} active title paragraph>
					<DeleteOutlined
						className="delete-btn"
						onClick={() => {
							handleDelete && handleOrderResult(false, order.id);
						}}
					/>
					<Descriptions title={order.order_no} column={1}>
						<Descriptions.Item label="Төсек орын">
							<Space direction="vertical" size={0}>
								<Space size={10}>
									<p>{order.rent.bed.name || 'Атауы жоқ'}</p>
									<p>
										({durationChange(order.rent.duration)} / {order.rent.price})
									</p>
								</Space>

								<p>{order.rent.bed.description}</p>
							</Space>
						</Descriptions.Item>

						<Descriptions.Item>
							<RequestCard request={order.request} showDeleteBtn={false} />
						</Descriptions.Item>
					</Descriptions>

					<div style={{ display: 'flex', gap: '12px' }}>
						<Button
							loading={loadingHanleOrderResult}
							style={{ width: '100%' }}
							type="primary"
							onClick={() => handleOrderResult(true, order.id)}>
							Рұқсат
						</Button>
						<Button
							loading={loadingHanleOrderResult}
							style={{ width: '100%' }}
							type="danger"
							onClick={() => handleOrderResult(false, order.id)}>
							Бас тарту
						</Button>
					</div>
				</Skeleton>
			</Card>
		</OrderCardStyledBox>
	);
});
