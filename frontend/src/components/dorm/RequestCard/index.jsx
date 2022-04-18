import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { pageAtom } from '@/store';

import { fromNow } from '@/utils';

import { Card, Skeleton, Descriptions, Image, Empty } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { RequestCardStyledBox } from './style';

export default memo(function RequestCard({
	request,
	loading,
	showDeleteBtn = true,
	handleDelete,
}) {
	const page = useRecoilValue(pageAtom);

	return (
		<RequestCardStyledBox showDeleteBtn={showDeleteBtn}>
			<Card>
				<Skeleton loading={loading} active title paragraph>
					<DeleteOutlined
						className="delete-btn"
						onClick={() => {
							handleDelete && handleDelete(request.id);
						}}
					/>
					<Descriptions title={request.tenant.fullname} column={1}>
						<Descriptions.Item label="ИИН нөмер">
							{request.idn}
						</Descriptions.Item>
						<Descriptions.Item label="Жіберілген уақыт">
							{fromNow(request.create_time, {
								lang: page.locale,
								suffix: true,
							})}
						</Descriptions.Item>
						{/* <Descriptions.Item label="Суреттер">
							{room.images.map(image => (
								<Image key={image.id} src={image.image} />
							))}
							{room.images.length === 0 ? (
								<Empty description="Суреттер жоқ" />
							) : null}
						</Descriptions.Item> */}
					</Descriptions>
				</Skeleton>
			</Card>
		</RequestCardStyledBox>
	);
});
