import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom, dormAtom } from '@/store';
import { useTranslation } from 'react-i18next';

import { useRequest, useMount, useSetState } from 'ahooks';
import {
	reqGetCities,
	reqGetDorms,
	reqCreateDorm,
	reqDeleteDorm,
} from '@/service/api/org-manager-api';
import { fromNow } from '@/utils';

import {
	message as antdMessage,
	Empty,
	Button,
	Modal,
	Input,
	Select,
	Upload,
	Space,
} from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { DormCard } from '@/components/dorm';
import { DormitoryManagementStyledBox } from './style';

const { TextArea } = Input;
const { Option } = Select;

export default function DormitoryManagement() {
	const setUser = useSetRecoilState(userAtom);
	const setDorm = useSetRecoilState(dormAtom);
	// const page = useRecoilValue(pageAtom);
	// const { t } = useTranslation();
	const [state, setState] = useSetState({
		dorms: [],
		cities: [],

		addDormModalVisibility: false,
		addDormFormData: {
			name: '',
			description: '',
			city: '',
			address: '',
			images: [],
		},
	});

	// const [addDormFormData, setAddDormFormData] = useSetState({})

	// 获取所有城市的请求
	const { runAsync: runReqGetCities } = useRequest(() => reqGetCities(), {
		manual: true,
	});

	// 获取所有城市
	useMount(() => {
		runReqGetCities()
			.then(({ cities }) => {
				setState(prevState => ({
					...prevState,
					cities,
					addDormFormData: {
						...prevState.addDormFormData,
						city: cities[0].id,
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

	// 获取所有宿舍的请求
	const { runAsync: runReqGetDorms } = useRequest(() => reqGetDorms(), {
		manual: true,
	});

	// 获取所有宿舍
	useMount(() => {
		runReqGetDorms()
			.then(({ dorms }) => {
				setState({ dorms });
			})
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	});

	const handleAddDorm = () => {
		let data = new FormData();
		Object.entries(state.addDormFormData).forEach(([key, value]) => {
			if (key === 'images') {
				value.forEach(image => {
					data.append(image.uid, image);
				});
			} else {
				data.append(key, value);
			}
		});

		reqCreateDorm(data)
			.then(({ dorm, message }) => {
				antdMessage.success(message);

				setState(prevState => ({
					dorms: [...prevState.dorms, dorm],
					addDormFormData: {
						...prevState.addDormFormData,
						name: '',
						description: '',
						address: '',
						images: [],
					},
					addDormModalVisibility: false,
				}));

				setDorm(prevState => ({ ...prevState, hasDorm: true }));
			})
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	};

	// 删除宿舍的请求
	const { runAsync: runReqDeleteDorm } = useRequest(id => reqDeleteDorm(id), {
		manual: true,
		throttleWait: 300,
	});

	// 删除宿舍
	const handleDeleteDorm = id => {
		runReqDeleteDorm(id)
			.then(({ message }) => {
				antdMessage.success(message);

				if (state.dorms.length === 1) {
					setDorm(prevState => ({ ...prevState, hasDorm: false }));
				}

				setState(prevState => ({
					dorms: prevState.dorms.filter(dorm => dorm.id !== id),
				}));
			})
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message ?? 'Error...');

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	};

	return (
		<>
			<DormitoryManagementStyledBox>
				<div className="head">
					<h2 className="title">Жатақханалар</h2>
					<Button
						type="primary"
						onClick={() => setState({ addDormModalVisibility: true })}>
						<PlusOutlined />
						<span>Жатақхана қосу</span>
					</Button>
				</div>

				<div className="dorms">
					{state.dorms.length > 0 ? (
						<Space direction="vertical" size={15}>
							{state.dorms.map(dorm => (
								<DormCard
									key={dorm.id}
									dorm={dorm}
									loading={false}
									handleDelete={handleDeleteDorm}
								/>
							))}
						</Space>
					) : (
						<Empty description="Жатақхана жоқ" />
					)}
				</div>
			</DormitoryManagementStyledBox>

			<Modal
				title="Жатақхана құру"
				visible={state.addDormModalVisibility}
				onOk={handleAddDorm}
				okText="Құру"
				onCancel={() => setState({ addDormModalVisibility: false })}>
				<Space direction="vertical" style={{ width: '100%' }} size={15}>
					<Input
						type="text"
						placeholder="Жатақхана атуы"
						maxLength={40}
						value={state.addDormFormData.name}
						onChange={({ target: { value } }) =>
							setState(prevState => ({
								addDormFormData: { ...prevState.addDormFormData, name: value },
							}))
						}
					/>

					<TextArea
						placeholder={'Сипаттама'}
						maxLength={254}
						showCount
						value={state.addDormFormData.description}
						onChange={({ target: { value } }) =>
							setState(prevState => ({
								addDormFormData: {
									...prevState.addDormFormData,
									description: value,
								},
							}))
						}
					/>

					<Select
						placeholder="Орналасқан қала"
						style={{ width: '100%' }}
						value={state.addDormFormData.city}
						onChange={value =>
							setState(prevState => ({
								addDormFormData: { ...prevState.addDormFormData, city: value },
							}))
						}>
						{state.cities.map(city => (
							<Option key={city.id} value={city.id}>
								{city.name}
							</Option>
						))}
					</Select>

					<Input
						type="text"
						placeholder="Нақты мекен-жай"
						maxLength={60}
						value={state.addDormFormData.address}
						onChange={({ target: { value } }) =>
							setState(prevState => ({
								addDormFormData: {
									...prevState.addDormFormData,
									address: value,
								},
							}))
						}
					/>

					<Upload
						accept="image/*"
						multiple={true}
						fileList={state.addDormFormData.images}
						beforeUpload={file => {
							if (state.addDormFormData.images.length === 5) {
								antdMessage.warning('Ең көбінде 5 сурет жариялауға болады');
								return;
							}

							setState(preState => ({
								addDormFormData: {
									...preState.addDormFormData,
									images: [...preState.addDormFormData.images, file],
								},
							}));
							return false;
						}}
						onRemove={file => {
							setState(preState => ({
								addDormFormData: {
									...preState.addDormFormData,
									images: preState.addDormFormData.images.filter(
										image => image !== file,
									),
								},
							}));
						}}>
						<Button icon={<UploadOutlined />}>Жатақхана суреті</Button>
					</Upload>
				</Space>
			</Modal>
		</>
	);
}
