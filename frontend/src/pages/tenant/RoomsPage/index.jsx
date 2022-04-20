import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';

import { useSetState, useRequest } from 'ahooks';
import { reqGetAllRooms } from '@/service/api/tenant-api';

import { message as antdMessage, Space, Empty } from 'antd';
import { CommonLayout } from '@/layout';
import { RoomCard } from '@/components/dorm';
import { RoomsPageStyledBox } from './style';

export default function RoomsPage() {
	const history = useHistory();
	const setUser = useSetRecoilState(userAtom);
	const [state, setState] = useSetState({
		rooms: [],
	});

	const { loading: loadingGetAllRooms } = useRequest(
		() => reqGetAllRooms(history.location.state.dormId),
		{
			onSuccess({ rooms }) {
				setState({ rooms });
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
			<RoomsPageStyledBox>
				<div className="rooms">
					{state.rooms.length > 0 ? (
						<Space direction="vertical" size={15}>
							{state.rooms.map(room => (
								<RoomCard
									key={room.id}
									room={room}
									loading={loadingGetAllRooms}
									showDeleteBtn={false}
									clickable
									onClick={() => {
										history.push('/beds', { roomId: room.id });
									}}
								/>
							))}
						</Space>
					) : (
						<Empty description="Бөлме жоқ" />
					)}
				</div>
			</RoomsPageStyledBox>
		</CommonLayout>
	);
}
