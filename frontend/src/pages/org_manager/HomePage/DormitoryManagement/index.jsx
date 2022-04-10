import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userAtom, dormAtom, pageAtom } from '@/store';
import { useTranslation } from 'react-i18next';

import { useRequest, useMount, useSetState } from 'ahooks';
import {
	reqGetCities,
	reqGetDorms,
	reqCreateDorm,
} from '@/service/api/org-manager-api';
import { fromNow } from '@/utils';

import {
	message as antdMessage,
	Empty,
	Card,
	Skeleton,
	Button,
	Modal,
	Input,
	Select,
	Upload,
	Space,
	Descriptions,
} from 'antd';
import {
	DeleteOutlined,
	PlusOutlined,
	UploadOutlined,
} from '@ant-design/icons';
import { DormitoryManagementStyledBox } from './style';

const { TextArea } = Input;
const { Option } = Select;

export default function DormitoryManagement() {
	const setUser = useSetRecoilState(userAtom);
	const page = useRecoilValue(pageAtom);
	const dorm = useRecoilValue(dormAtom);
	const { t } = useTranslation();
	const [state, setState] = useSetState({
		dorms: [],
		dormImages: [],
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
	const { runAsync: runReqGetCities, loading: loadingReqGetCities } =
		useRequest(() => reqGetCities(), {
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
	const { runAsync: runReqGetDorms, loading: loadingReqGetDorms } = useRequest(
		() => reqGetDorms(),
		{
			manual: true,
		},
	);

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
			.then(({ dorm, dorm_images, message }) => {
				antdMessage.success(message);
				setState(prevState => ({
					dorms: [...prevState.dorms, dorm],
					dormImages: [...prevState.dormImages, ...dorm_images],
					addDormFormData: {
						...prevState.addDormFormData,
						name: '',
						description: '',
						address: '',
						images: [],
					},
					addDormModalVisibility: false,
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
					{state.dorms.length ? (
						state.dorms.map(dorm => (
							<Card key={dorm.id} className="dorm">
								<Skeleton loading={false} active>
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
									</Descriptions>
								</Skeleton>
							</Card>
						))
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
