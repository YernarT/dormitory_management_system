import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { pageAtom } from '@/store';

import { fromNow } from '@/utils';

import { Skeleton, Descriptions, Image, Empty } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { DormCardStyledBox } from './style';

export default memo(function DormCard({ dorm, loading }) {
	const page = useRecoilValue(pageAtom);

	return (
		<DormCardStyledBox>
			<Skeleton loading={loading} active>
				<DeleteOutlined
					className="delete-btn"
					// onClick={() => handleDeleteCity(city.id)}
				/>
				<Descriptions title={dorm.name} column={1}>
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
			</Skeleton>
		</DormCardStyledBox>
	);
});
