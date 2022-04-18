import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';
import { useTranslation } from 'react-i18next';

import { useRequest, useMount, useSetState } from 'ahooks';
import {
	reqGetRooms,
	reqGetBeds,
	reqCreateBed,
} from '@/service/api/dorm-manager-api';

import {
	message as antdMessage,
	Button,
	Space,
	Empty,
	Modal,
	Input,
	Upload,
	Select,
} from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { BedCard } from '@/components/dorm';
import { BedManagementStyledBox } from './style';

const { TextArea } = Input;
const { Option } = Select;

export default function BedManagement() {
	const setUser = useSetRecoilState(userAtom);
	const { t } = useTranslation();
	const [state, setState] = useSetState({
		rooms: [],
		beds: [],

		addBedModalVisibility: false,
		addBedFormData: {
			name: '',
			description: '',
			room: '',
			images: [],
		},
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
				setState(prevState => ({
					rooms,
					addBedFormData: { ...prevState.addBedFormData, room: rooms[0].id },
				}));
			})
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	});

	// 获取所有床位的请求
	const { runAsync: runReqGetBeds, loading: loadingReqGetBeds } = useRequest(
		() => reqGetBeds(),
		{
			manual: true,
		},
	);

	// 获取所有床位
	useMount(() => {
		runReqGetBeds()
			.then(({ beds }) => {
				setState({ beds });
			})
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	});

	// 添加床位的请求
	const { runAsync: runReqCreateBed } = useRequest(data => reqCreateBed(data), {
		manual: true,
	});

	// 处理添加床位
	const handleAddBed = () => {
		let data = new FormData();
		Object.entries(state.addBedFormData).forEach(([key, value]) => {
			if (key === 'images') {
				value.forEach(image => {
					data.append(image.uid, image);
				});
			} else {
				data.append(key, value);
			}
		});

		runReqCreateBed(data)
			.then(({ bed, message }) => {
				antdMessage.success(message);

				setState(prevState => ({
					beds: [...prevState.beds, bed],
					addBedModalVisibility: false,
					addBedFormData: {
						...prevState.addBedFormData,
						room: prevState.rooms[0].id,
					},
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
			<BedManagementStyledBox>
				<div className="head">
					<h2 className="title">Төсек орындар</h2>
					<Button
						type="primary"
						onClick={() => setState({ addBedModalVisibility: true })}>
						<PlusOutlined />
						<span>Төсек орын</span>
					</Button>
				</div>

				<div className="beds">
					{state.beds.length > 0 ? (
						<Space direction="vertical" size={15}>
							{state.beds.map(bed => (
								<BedCard
									key={bed.id}
									bed={bed}
									loading={loadingReqGetRooms && loadingReqGetBeds}
									showDeleteBtn={false}
								/>
							))}
						</Space>
					) : (
						<Empty description="Төсек орын жоқ" />
					)}
				</div>
			</BedManagementStyledBox>

			<Modal
				title="Төсек орын құру"
				visible={state.addBedModalVisibility}
				onOk={handleAddBed}
				okText="Құру"
				onCancel={() => setState({ addBedModalVisibility: false })}>
				<Space direction="vertical" style={{ width: '100%' }} size={15}>
					<Input
						type="text"
						placeholder="Төсек орын атауы (Міндетті емес)"
						maxLength={24}
						value={state.addBedFormData.name}
						onChange={({ target: { value } }) =>
							setState(prevState => ({
								addBedFormData: { ...prevState.addBedFormData, name: value },
							}))
						}
					/>

					<TextArea
						placeholder={'Сипаттама'}
						maxLength={254}
						showCount
						value={state.addBedFormData.description}
						onChange={({ target: { value } }) =>
							setState(prevState => ({
								addBedFormData: {
									...prevState.addBedFormData,
									description: value,
								},
							}))
						}
					/>

					<Select
						placeholder="Бөлме"
						style={{ width: '100%' }}
						value={state.addBedFormData.room}
						onChange={value =>
							setState(prevState => ({
								addBedFormData: { ...prevState.addBedFormData, room: value },
							}))
						}>
						{state.rooms.map(room => (
							<Option key={room.id} value={room.id}>
								{room.name}
							</Option>
						))}
					</Select>

					<Upload
						accept="image/*"
						multiple={true}
						fileList={state.addBedFormData.images}
						beforeUpload={file => {
							if (state.addBedFormData.images.length === 5) {
								antdMessage.warning('Ең көбінде 5 сурет жариялауға болады');
								return;
							}

							setState(preState => ({
								addBedFormData: {
									...preState.addBedFormData,
									images: [...preState.addBedFormData.images, file],
								},
							}));
							return false;
						}}
						onRemove={file => {
							setState(preState => ({
								addBedFormData: {
									...preState.addBedFormData,
									images: preState.addBedFormData.images.filter(
										image => image !== file,
									),
								},
							}));
						}}>
						<Button icon={<UploadOutlined />}>Төсек орын суреті</Button>
					</Upload>
				</Space>
			</Modal>
		</>
	);
}
