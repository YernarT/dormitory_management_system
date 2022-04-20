import React, { memo } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { pageAtom, userAtom } from '@/store';

import { fromNow } from '@/utils';

import { Card, Skeleton, Descriptions, Image, Empty, Button } from 'antd';
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

	const durationChange = duration => {
		if (duration === 'month') {
			return 'Ай';
		}
		if (duration === 'year') {
			return 'Жыл';
		}
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

					{user.role === 'tenant' && (
						<Button type="primary" block style={{ marginBottom: '15px' }}>
							Өтініш қалдыру
						</Button>
					)}
				</Skeleton>
			</Card>
		</BedCardStyledBox>
	);
});
