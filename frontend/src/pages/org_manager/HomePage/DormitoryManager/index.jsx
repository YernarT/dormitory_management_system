import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userAtom, pageAtom } from '@/store';

import { useSetState, useRequest, useMount } from 'ahooks';

import {
	reqGetDormManagers,
	reqCreateDormManager,
} from '@/service/api/org-manager-api';
import { fromNow } from '@/utils';

import {
	Button,
	Space,
	Modal,
	Input,
	Select,
	message as antdMessage,
	Card,
	Empty,
	Descriptions,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { DormitoryManagerStyledBox } from './style';

const { Option } = Select;

export default function DormitoryManager() {
	const setUser = useSetRecoilState(userAtom);
	const page = useRecoilValue(pageAtom);
	const [state, setState] = useSetState({
		dormManagers: [],

		addDormManagerModalVisibility: false,
		addDormManagerFormData: {
			fullname: '',
			email: '',
			password: '',
			role: 'dorm manager',
			gender: false,
		},
	});

	// 获取所有宿管的请求
	const { runAsync: runReqGetDormManagers } = useRequest(
		() => reqGetDormManagers(),
		{
			manual: true,
		},
	);
	// 获取所有宿管
	useMount(() => {
		runReqGetDormManagers()
			.then(({ dorm_managers: dormManagers }) => setState({ dormManagers }))
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	});

	// 添加宿管的请求
	const { runAsync: runReqCreateDormManager } = useRequest(
		data => reqCreateDormManager(data),
		{
			manual: true,
		},
	);
	// 处理 添加宿管
	const handleAddDormManager = () => {
		runReqCreateDormManager(state.addDormManagerFormData)
			.then(({ dorm_manager: dormManager, message }) => {
				antdMessage.success(message);

				setState(prevState => ({
					dormManagers: [prevState.dormManagers, dormManager],

					addDormManagerModalVisibility: false,
					addDormManagerFormData: {
						fullname: '',
						email: '',
						password: '',
						role: 'dorm manager',
						gender: false,
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
			<DormitoryManagerStyledBox>
				<div className="head">
					<h2 className="title">Жатақ басқарушылар</h2>
					<Button
						type="primary"
						onClick={() => setState({ addDormManagerModalVisibility: true })}>
						<PlusOutlined />
						<span>Жатақ басқарушы қосу</span>
					</Button>
				</div>

				<Space direction="vertical" size={15}>
					{state.dormManagers.map(manager => (
						<Card key={manager.id} className="dorm-manager">
							<DeleteOutlined
								className="delete-btn"
								// onClick={() => handleDeleteCity(city.id)}
							/>
							<Descriptions title={manager.fullname} column={1}>
								<Descriptions.Item label="Email">
									{manager.email}
								</Descriptions.Item>
								<Descriptions.Item label="Жыныс">
									{manager.gender ? 'Ер' : 'Әйел'}
								</Descriptions.Item>
								<Descriptions.Item label="Құрылған уақыт">
									{fromNow(manager.create_time, {
										lang: page.locale,
										suffix: true,
									})}
								</Descriptions.Item>
							</Descriptions>
						</Card>
					))}
				</Space>
				{state.dormManagers.length === 0 ? (
					<Empty description="Жатақ басқарушы жоқ" />
				) : null}
			</DormitoryManagerStyledBox>

			<Modal
				title="Жатақхана құру"
				visible={state.addDormManagerModalVisibility}
				onOk={handleAddDormManager}
				okText="Құру"
				onCancel={() => setState({ addDormManagerModalVisibility: false })}>
				<Space direction="vertical" style={{ width: '100%' }} size={15}>
					<Input
						type="text"
						placeholder="Атуы"
						maxLength={40}
						value={state.addDormManagerFormData.fullname}
						onChange={({ target: { value } }) =>
							setState(prevState => ({
								addDormManagerFormData: {
									...prevState.addDormManagerFormData,
									fullname: value,
								},
							}))
						}
					/>
					<Input
						type="email"
						placeholder="Email"
						maxLength={254}
						value={state.addDormManagerFormData.email}
						onChange={({ target: { value } }) =>
							setState(prevState => ({
								addDormManagerFormData: {
									...prevState.addDormManagerFormData,
									email: value,
								},
							}))
						}
					/>

					<Input
						type="text"
						placeholder="Құпия сөз"
						maxLength={254}
						value={state.addDormManagerFormData.password}
						onChange={({ target: { value } }) =>
							setState(prevState => ({
								addDormManagerFormData: {
									...prevState.addDormManagerFormData,
									password: value,
								},
							}))
						}
					/>

					<Select
						placeholder="Жыныс"
						style={{ width: '100%' }}
						value={state.addDormManagerFormData.gender}
						onChange={value =>
							setState(prevState => ({
								addDormManagerFormData: {
									...prevState.addDormManagerFormData,
									gender: value,
								},
							}))
						}>
						<Option value={true}>Ер</Option>
						<Option value={false}>Әйел</Option>
					</Select>
				</Space>
			</Modal>
		</>
	);
}
