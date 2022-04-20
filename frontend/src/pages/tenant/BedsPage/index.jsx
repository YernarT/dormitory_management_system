import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';

import { useSetState, useRequest } from 'ahooks';
import { reqGetAllBeds } from '@/service/api/tenant-api';

import { message as antdMessage, Space, Empty } from 'antd';
import { CommonLayout } from '@/layout';
import { BedCard } from '@/components/dorm';
import { BedsPageStyledBox } from './style';

export default function BedsPage() {
	const history = useHistory();
	const setUser = useSetRecoilState(userAtom);
	const [state, setState] = useSetState({
		beds: [],
	});

	const { loading: loadingGetAllBeds } = useRequest(
		() => reqGetAllBeds(history.location.state.roomId),
		{
			onSuccess({ beds }) {
				setState({ beds });
			},
			onError({ message, needExecuteLogout, initialUser }) {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			},
		},
	);

	return (
		<CommonLayout>
			<BedsPageStyledBox>
				<div className="beds">
					{state.beds.length > 0 ? (
						<Space direction="vertical" size={15}>
							{state.beds.map(bed => (
								<BedCard
									key={bed.id}
									bed={bed}
									loading={loadingGetAllBeds}
									showDeleteBtn={false}
								/>
							))}
						</Space>
					) : (
						<Empty description="Төсек орын жоқ" />
					)}
				</div>
			</BedsPageStyledBox>
		</CommonLayout>
	);
}
