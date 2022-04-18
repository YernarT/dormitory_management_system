import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom, dormAtom } from '@/store';
// import { useTranslation } from 'react-i18next';

import { useRequest, useMount, useSetState } from 'ahooks';
import {
	reqGetRooms,
	reqCreateRoom,
	reqGetDorms,
	reqDeleteRoom,
} from '@/service/api/org-manager-api';

import {
	message as antdMessage,
	Button,
	Space,
	Empty,
	Modal,
	Input,
	Select,
	Upload,
} from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { RoomCard } from '@/components/dorm';
import { RoomManagementStyledBox } from './style';

const { Option } = Select;
const { TextArea } = Input;

export default function RoomManagement() {
	const setUser = useSetRecoilState(userAtom);
	const setDorm = useSetRecoilState(dormAtom);
	// const { t } = useTranslation();
	const [state, setState] = useSetState({
		dorms: [],
		rooms: [],

		addRoomModalVisibility: false,
		addRoomFormData: {
			name: '',
			floor: 1,
			description: '',
			dorm: '',
			images: [],
		},
	});

	// 获取所有宿舍的请求
	const { runAsync: runReqGetDorms } = useRequest(() => reqGetDorms(), {
		manual: true,
	});

	// 获取所有宿舍
	useMount(() => {
		runReqGetDorms()
			.then(({ dorms }) => {
				setState(prevState => ({
					dorms,
					addRoomFormData: {
						...prevState.addRoomFormData,
						dorm: dorms[0].id,
					},
				}));
			})
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
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

	// 添加房间的请求
	const { runAsync: runReqCreateRoom } = useRequest(
		data => reqCreateRoom(data),
		{
			manual: true,
		},
	);

	// 处理添加房间
	const handleAddRoom = () => {
		let data = new FormData();
		Object.entries(state.addRoomFormData).forEach(([key, value]) => {
			if (key === 'images') {
				value.forEach(image => {
					data.append(image.uid, image);
				});
			} else {
				data.append(key, value);
			}
		});

		runReqCreateRoom(data)
			.then(({ room, message }) => {
				antdMessage.success(message);

				setState(prevState => ({
					rooms: [...prevState.rooms, room],
					addRoomModalVisibility: false,
					addRoomFormData: {
						...prevState.addRoomFormData,
						name: '',
						floor: 1,
						description: '',
					},
				}));

				setDorm(prevState => ({ ...prevState, hasRoom: true }));
			})
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	};

	// 删除房间的请求
	const { runAsync: runReqDeleteRoom } = useRequest(id => reqDeleteRoom(id), {
		manual: true,
		throttleWait: 300,
	});

	// 处理删除房间
	const handleDeleteRoom = id => {
		runReqDeleteRoom(id)
			.then(({ message }) => {
				antdMessage.success(message);

				if (state.rooms.length === 1) {
					setDorm(prevState => ({ ...prevState, hasRoom: false }));
				}

				setState(prevState => ({
					rooms: prevState.rooms.filter(room => room.id !== id),
				}));
			})
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	};

	return (
		<>
			<RoomManagementStyledBox>
				<div className="head">
					<h2 className="title">Бөлмелер</h2>
					<Button
						type="primary"
						onClick={() => setState({ addRoomModalVisibility: true })}>
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
									showDeleteBtn={true}
									handleDelete={handleDeleteRoom}
								/>
							))}
						</Space>
					) : (
						<Empty description="Бөлме жоқ" />
					)}
				</div>
			</RoomManagementStyledBox>

			<Modal
				title="Бөлме құру"
				visible={state.addRoomModalVisibility}
				onOk={handleAddRoom}
				okText="Құру"
				onCancel={() => setState({ addRoomModalVisibility: false })}>
				<Space direction="vertical" style={{ width: '100%' }} size={15}>
					<Input
						type="text"
						placeholder="Бөлме атуы"
						maxLength={40}
						value={state.addRoomFormData.name}
						onChange={({ target: { value } }) =>
							setState(prevState => ({
								addRoomFormData: { ...prevState.addRoomFormData, name: value },
							}))
						}
					/>

					<TextArea
						placeholder={'Сипаттама'}
						maxLength={254}
						showCount
						value={state.addRoomFormData.description}
						onChange={({ target: { value } }) =>
							setState(prevState => ({
								addRoomFormData: {
									...prevState.addRoomFormData,
									description: value,
								},
							}))
						}
					/>

					<Select
						placeholder="Жатақхана"
						style={{ width: '100%' }}
						value={state.addRoomFormData.dorm}
						onChange={value =>
							setState(prevState => ({
								addRoomFormData: { ...prevState.addRoomFormData, dorm: value },
							}))
						}>
						{state.dorms.map(dorm => (
							<Option key={dorm.id} value={dorm.id}>
								{`${dorm.name} ${dorm.city.name}`}
							</Option>
						))}
					</Select>

					<Select
						placeholder="Қабат нөмері"
						style={{ width: '100%' }}
						value={state.addRoomFormData.floor}
						onChange={value =>
							setState(prevState => ({
								addRoomFormData: { ...prevState.addRoomFormData, floor: value },
							}))
						}>
						{Array.from(Array(32).keys()).map(num => (
							<Option key={num + 1} value={num + 1}>
								{num + 1}
							</Option>
						))}
					</Select>

					<Upload
						accept="image/*"
						multiple={true}
						fileList={state.addRoomFormData.images}
						beforeUpload={file => {
							if (state.addRoomFormData.images.length === 5) {
								antdMessage.warning('Ең көбінде 5 сурет жариялауға болады');
								return;
							}

							setState(preState => ({
								addRoomFormData: {
									...preState.addRoomFormData,
									images: [...preState.addRoomFormData.images, file],
								},
							}));
							return false;
						}}
						onRemove={file => {
							setState(preState => ({
								addRoomFormData: {
									...preState.addRoomFormData,
									images: preState.addRoomFormData.images.filter(
										image => image !== file,
									),
								},
							}));
						}}>
						<Button icon={<UploadOutlined />}>Бөлме суреті</Button>
					</Upload>
				</Space>
			</Modal>
		</>
	);
}
