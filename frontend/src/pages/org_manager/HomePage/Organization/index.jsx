import React from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { userAtom, dormAtom } from '@/store';
import { useTranslation } from 'react-i18next';

import { useRequest, useMount, useSetState } from 'ahooks';
import {
	reqGetCities,
	reqGetDorms,
	reqCreateDorm,
	reqGetMyOrgaization,
	reqCreateOrgaization,
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
	Space,
} from 'antd';
import {
	DeleteOutlined,
	PlusOutlined,
	UploadOutlined,
} from '@ant-design/icons';
import { OrganizationStyledBox } from './style';

export default function Organization() {
	const setUser = useSetRecoilState(userAtom);
	const [dorm, setDorm] = useRecoilState(dormAtom);
	const { t } = useTranslation();
	const [state, setState] = useSetState({
		addOrganizationModalVisibile: false,
		addOrganizationFormData: {
			name: '',
			category: '',
		},
	});

	// 创建机构的请求
	const { runAsync: runReqCreateOrganization } = useRequest(
		data => reqCreateOrgaization(data),
		{
			manual: true,
		},
	);

	// 处理创建机构
	const handleAddOrganization = () => {
		runReqCreateOrganization(state.addOrganizationFormData)
			.then(({ organization }) =>
				setDorm(prevState => ({ ...prevState, organization })),
			)
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);
				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	};

	return (
		<>
			<OrganizationStyledBox>
				<div className="head">
					<h2 className="title">Ұйым</h2>
					<Button
						type="primary"
						onClick={() => setState({ addOrganizationModalVisibile: true })}>
						<PlusOutlined />
						<span>Ұйым құру</span>
					</Button>
				</div>

				<div className="org">
					{dorm.organization ? (
						<Card title={dorm.organization.name}></Card>
					) : (
						<Empty description="Ұйым жоқ" />
					)}
				</div>
			</OrganizationStyledBox>

			<Modal
				title="Жатақхана құру"
				visible={state.addOrganizationModalVisibile}
				onOk={handleAddOrganization}
				okText="Құру"
				onCancel={() => setState({ addOrganizationModalVisibile: false })}>
				<Space direction="vertical" size={15} style={{ width: '100%' }}>
					<Input
						// style={{ width: '100%' }}
						type="text"
						placeholder="Ұйым атуы"
						maxLength={40}
						value={state.addOrganizationFormData.name}
						onChange={({ target: { value } }) =>
							setState(prevState => ({
								addOrganizationFormData: {
									...prevState.addOrganizationFormData,
									name: value,
								},
							}))
						}
					/>

					<Select
						style={{ width: '100%' }}
						placeholder="Ұйым санаты"
						onChange={value =>
							setState(prevState => ({
								addOrganizationFormData: {
									...prevState.addOrganizationFormData,
									category: value,
								},
							}))
						}>
						{/* {state.cities.map(city => (
						<Option key={city.id} value={city.id}>
							{city.name}
						</Option>
					))} */}
					</Select>
				</Space>
			</Modal>
		</>
	);
}
