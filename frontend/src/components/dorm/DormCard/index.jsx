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
	message as antdMessage,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { DormCardStyledBox } from './style';

export default memo(function DormCard({
	dorm,
	loading,
	showDeleteBtn = true,
	handleDelete,
	clickable = false,
	onClick,
}) {
	const [user, setUser] = useRecoilState(userAtom);
	const page = useRecoilValue(pageAtom);

	// 入住请求的请求
	const { runAsync: runReqCreateOrder, loading: loadingReqCreateOrder } =
		useRequest(data => reqCreateOrder(data), {
			manual: true,
		});

	// 处理发送入住请求
	const handleSendRequest = () => {
		runReqCreateOrder({ dormId: dorm.id })
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
		<DormCardStyledBox
			showDeleteBtn={showDeleteBtn}
			clickable={clickable}
			onClick={() => {
				clickable && onClick && onClick();
			}}>
			<Card className="card">
				<Skeleton loading={loading} active title paragraph>
					<DeleteOutlined
						className="delete-btn"
						onClick={() => {
							handleDelete && handleDelete(dorm.id);
						}}
					/>
					<Descriptions title={dorm.name} column={1}>
						<Descriptions.Item label="Төсек орын">
							<span>Жалпы орын: </span>
							<strong>{dorm.bed_count}</strong>

							<span style={{ marginLeft: '10px' }}>Бос орын: </span>
							<strong>{dorm.free_bed_count}</strong>
						</Descriptions.Item>
						<Descriptions.Item label="Сипаттама">
							{dorm.description}
						</Descriptions.Item>
						<Descriptions.Item label="Орналасқан қала">
							{dorm.city.name}
						</Descriptions.Item>
						<Descriptions.Item label="Нақты мекенжайы">
							{dorm.address}
						</Descriptions.Item>
						<Descriptions.Item label="Құрылған уақыт">
							{fromNow(dorm.create_time, {
								lang: page.locale,
								suffix: true,
							})}
						</Descriptions.Item>
						<Descriptions.Item label="Суреттер">
							{dorm.images.map(image => (
								<Image key={image.id} src={image.image} />
							))}
							{dorm.images.length === 0 ? (
								<Empty description="Суреттер жоқ" />
							) : null}
						</Descriptions.Item>
					</Descriptions>

					<Button
						block
						type="primary"
						style={{ marginTop: '15px' }}
						onClick={handleSendRequest}
						loading={loadingReqCreateOrder}>
						Өтініщ қалдыру
					</Button>
				</Skeleton>
			</Card>
		</DormCardStyledBox>
	);
});
