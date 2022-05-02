import React, { memo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { pageAtom, userAtom } from '@/store';

import { useRequest, useSetState } from 'ahooks';
import {
	reqHandleOrderResult,
	reqGetRooms,
	reqGetBeds,
} from '@/service/api/org-manager-api';

import {
	Card,
	Skeleton,
	Descriptions,
	Empty,
	Space,
	Button,
	message as antdMessage,
	Select,
	Modal,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { RequestCard } from '@/components/dorm';
import { OrderCardStyledBox } from './style';
import { useUpdateEffect } from 'ahooks';

const { Option } = Select;

export default memo(function OrderCard({
	order,
	loading,
	showDeleteBtn = true,
	handleDelete,
	afterHandleResult,
}) {
	const setUser = useSetRecoilState(userAtom);
	const page = useRecoilValue(pageAtom);

	const [state, setState] = useSetState({
		selectRoomBedModalVisibile: false,

		rooms: [],
		beds: [],

		selectedRoom: null,
		selectedBed: null,
	});

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
		let [roomId, bedId] = [state.selectedRoom, state.selectedBed];

		if (solution && ![roomId, bedId].every(el => el)) {
			antdMessage.warning('Бөлме және төсек орын таңдалу керек');
			return;
		}

		runHanldeOrderResult({ solution, orderId, roomId, bedId })
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

	// 获取房间，床位
	const { loading: loadingGetRooms } = useRequest(reqGetRooms, {
		pollingInterval: 3000,

		onSuccess({ rooms }) {
			setState({ rooms });
		},
	});

	const { loading: loadingGetBeds } = useRequest(reqGetBeds, {
		pollingInterval: 3000,

		onSuccess({ beds }) {
			setState(prevState => ({
				beds: beds.filter(
					bed => bed.room.id === prevState.selectedRoom && bed.owner === null,
				),
			}));
		},
	});

	useUpdateEffect(() => {
		setState({ selectedBed: null });
	}, [state.selectedRoom]);

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
						{order.rent && (
							<Descriptions.Item label="Төсек орын">
								<Space direction="vertical" size={0}>
									<Space size={10}>
										<p>{order.rent.bed.name || 'Атауы жоқ'}</p>
										<p>
											({durationChange(order.rent.duration)} /{' '}
											{order.rent.price})
										</p>
									</Space>

									<p>{order.rent.bed.description}</p>
								</Space>
							</Descriptions.Item>
						)}

						<Descriptions.Item>
							<RequestCard request={order.request} showDeleteBtn={false} />
						</Descriptions.Item>
					</Descriptions>

					<div style={{ display: 'flex', gap: '12px' }}>
						<Button
							style={{ width: '100%' }}
							type="primary"
							onClick={() => setState({ selectRoomBedModalVisibile: true })}>
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

				<Modal
					title="Бөлме мен төсек орын меншіктеу"
					visible={state.selectRoomBedModalVisibile}
					onOk={() => handleOrderResult(true, order.id)}
					onCancel={() => setState({ selectRoomBedModalVisibile: false })}>
					<Space direction="vertical" style={{ width: '100%' }} size="large">
						<Select
							loading={loadingGetRooms || loadingGetBeds}
							style={{ width: '100%' }}
							placeholder="Бөлме"
							onSelect={value => setState({ selectedRoom: value })}>
							{state.rooms.map(room => (
								<Option key={room.id} value={room.id}>
									{room.name} ({room.floor}-ші қабат)
								</Option>
							))}
						</Select>

						<Select
							loading={loadingGetRooms || loadingGetBeds}
							style={{ width: '100%' }}
							placeholder="Төсекорын"
							onSelect={value => setState({ selectedBed: value })}>
							{state.beds.map(bed => (
								<Option key={bed.id} value={bed.id}>
									{bed?.name || 'Атауы жоқ төсек орын'}
								</Option>
							))}
						</Select>
					</Space>
				</Modal>
			</Card>
		</OrderCardStyledBox>
	);
});
