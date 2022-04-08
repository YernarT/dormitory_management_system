import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';
import { useTranslation } from 'react-i18next';

import { useRequest, useMount, useSetState } from 'ahooks';
import {
	reqGetCities,
	reqGetDorms,
	reqCreateDorm,
	reqGetMyOrgaization,
} from '@/service/api/org-manager-api';

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
	const { t } = useTranslation();
	const [state, setState] = useSetState({
		organization: null,
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

	// 获取所有城市的请求
	const { runAsync: runReqGetCities, loading: loadingReqGetCities } =
		useRequest(() => reqGetCities(), {
			manual: true,
		});

	// 获取所有城市
	useMount(() => {
		runReqGetCities()
			.then(({ cities }) => {
				setState({ cities });
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

	// 获取机构的请求
	const { runAsync: runReqGetMyOrg } = useRequest(() => reqGetMyOrgaization(), {
		manual: true,
	});

	// 获取机构
	useMount(() => {
		runReqGetMyOrg()
			.then(({ organization }) => setState({ organization }))
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
			.then(data => {
				console.log(data);
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
									<p className="dorm-name">{dorm.name}</p>
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
							addDormFormData: { ...prevState.addDormFormData, address: value },
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
			</Modal>
		</>
	);
}
