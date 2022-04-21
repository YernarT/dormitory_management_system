import React, { memo } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { pageAtom, userAtom } from '@/store';

import { useRequest, useSetState } from 'ahooks';
import { reqCreateOrder } from '@/service/api/tenant-api';
import { fromNow } from '@/utils';

import {
	Card,
	Skeleton,
	Descriptions,
	Image,
	Empty,
	Button,
	InputNumber,
	message as antdMessage,
	Space,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { BedCardStyledBox } from './style';

export default memo(function BedCard({
	bed,
	loading,
	showDeleteBtn = true,
	handleDelete,
}) {
	const page = useRecoilValue(pageAtom);
	const [user, setUser] = useRecoilState(userAtom);
	const [state, setState] = useSetState({
		rentCount: 1,
	});

	const durationChange = duration => {
		if (duration === 'month') {
			return 'Ай';
		}
		if (duration === 'year') {
			return 'Жыл';
		}
	};

	// 入住请求的请求
	const { runAsync: runReqCreateOrder, loading: loadingReqCreateOrder } =
		useRequest(data => reqCreateOrder(data), {
			manual: true,
		});

	// 处理发送入住请求
	const handleSendRequest = () => {
		runReqCreateOrder({ bedId: bed.id, rentCount: state.rentCount })
			.then(() => {
				antdMessage.success('Өтініш жіберілді');
			})
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	};

	return (
		<BedCardStyledBox showDeleteBtn={showDeleteBtn}>
			<Card>
				<Skeleton loading={loading} active title paragraph>
					<DeleteOutlined
						className="delete-btn"
						onClick={() => {
							handleDelete && handleDelete(bed.id);
						}}
					/>

					<Descriptions title={bed.name ?? 'Төсек орын'} column={1}>
						<Descriptions.Item label="Иесі">
							{bed?.owner?.fullname ?? 'Бос орын'}
						</Descriptions.Item>

						<Descriptions.Item label="Бөлме">{bed.room.name}</Descriptions.Item>

						<Descriptions.Item label="Сипаттама">
							{bed.description}
						</Descriptions.Item>

						<Descriptions.Item label="Бағасы">
							{bed.rent.price}тг / {durationChange(bed.rent.duration)}
						</Descriptions.Item>

						<Descriptions.Item label="Құрылған уақыт">
							{fromNow(bed.create_time, {
								lang: page.locale,
								suffix: true,
							})}
						</Descriptions.Item>

						<Descriptions.Item label="Суреттер">
							{bed.images.map(image => (
								<Image key={image.id} src={image.image} />
							))}
							{bed.images.length === 0 ? (
								<Empty description="Суреттер жоқ" />
							) : null}
						</Descriptions.Item>
					</Descriptions>

					{user.role === 'tenant' && !bed.owner && (
						<Space direction="vertical" size={15} style={{ width: '100%' }}>
							<Space size={10}>
								<span>Төлем жиілігі: </span>
								<InputNumber
									min={1}
									max={24}
									value={state.rentCount}
									onChange={value => setState({ rentCount: value })}
								/>
							</Space>
							<Button
								type="primary"
								block
								style={{ marginBottom: '15px' }}
								onClick={handleSendRequest}
								loading={loadingReqCreateOrder}>
								Өтініш қалдыру
							</Button>
						</Space>
					)}
				</Skeleton>
			</Card>
		</BedCardStyledBox>
	);
});
