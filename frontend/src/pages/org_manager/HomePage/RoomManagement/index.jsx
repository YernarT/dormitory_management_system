import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';
import { useTranslation } from 'react-i18next';

import { useRequest, useMount, useSetState } from 'ahooks';
import { reqGetRooms, reqCreateRoom } from '@/service/api/org-manager-api';

import { message as antdMessage, Button, Space, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { RoomCard } from '@/components/dorm';
import { RoomManagementStyledBox } from './style';

export default function RoomManagement() {
	const setUser = useSetRecoilState(userAtom);
	const { t } = useTranslation();
	const [state, setState] = useSetState({
		rooms: [],
	});

	// 获取所有房间的请求
	const { runAsync: runReqGetRooms, loading: loadingReqGetRooms } = useRequest(
		() => reqGetRooms(),
		{
			manual: true,
		},
	);

	// 获取所有房间
	useMount(() => {
		runReqGetRooms()
			.then(({ rooms }) => {
				setState({ rooms });
			})
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	});

	return (
		<RoomManagementStyledBox>
			<div className="head">
				<h2 className="title">Бөлмелер</h2>
				<Button
					type="primary"
					onClick={() => setState({ addDormModalVisibility: true })}>
					<PlusOutlined />
					<span>Бөлмелер</span>
				</Button>
			</div>

			<div className="rooms">
				{state.rooms.length > 0 ? (
					<Space direction="vertical" size={15}>
						{state.rooms.map(room => (
							<RoomCard
								key={room.id}
								room={room}
								loading={loadingReqGetRooms}
								showDeleteBtn={false}
							/>
						))}
					</Space>
				) : (
					<Empty description="Бөлме жоқ" />
				)}
			</div>
		</RoomManagementStyledBox>
	);
}
