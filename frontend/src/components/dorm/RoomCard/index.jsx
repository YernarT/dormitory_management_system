import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { pageAtom } from '@/store';

import { fromNow } from '@/utils';

import { Card, Skeleton, Descriptions, Image, Empty } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { RoomCardStyledBox } from './style';

export default memo(function RoomCard({
	room,
	loading,
	showDeleteBtn = true,
	handleDelete,
	clickable = false,
	onClick,
}) {
	const page = useRecoilValue(pageAtom);

	return (
		<RoomCardStyledBox
			showDeleteBtn={showDeleteBtn}
			clickable={clickable}
			onClick={() => {
				clickable && onClick && onClick();
			}}>
			<Card>
				<Skeleton loading={loading} active title paragraph>
					<DeleteOutlined
						className="delete-btn"
						onClick={() => {
							handleDelete && handleDelete(room.id);
						}}
					/>
					<Descriptions title={room.name} column={1}>
						<Descriptions.Item label="Қабат нөмері">
							{room.floor}-ші қабат
						</Descriptions.Item>
						<Descriptions.Item label="Сипаттама">
							{room.description}
						</Descriptions.Item>
						<Descriptions.Item label="Құрылған уақыт">
							{fromNow(room.create_time, {
								lang: page.locale,
								suffix: true,
							})}
						</Descriptions.Item>
						<Descriptions.Item label="Суреттер">
							{room.images.map(image => (
								<Image key={image.id} src={image.image} />
							))}
							{room.images.length === 0 ? (
								<Empty description="Суреттер жоқ" />
							) : null}
						</Descriptions.Item>
					</Descriptions>
				</Skeleton>
			</Card>
		</RoomCardStyledBox>
	);
});
