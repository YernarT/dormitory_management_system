import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';
import { useTranslation } from 'react-i18next';

import { useRequest, useMount, useSetState } from 'ahooks';
import {
	reqGetDorms,
	reqCreateDorm,
	reqGetCities,
} from '@/service/api/dorm-manager-api';

import { message as antdMessage, Button, Space, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DormCard } from '@/components/dorm';
import { DormitoryManagementStyledBox } from './style';

export default function DormitoryManagement() {
	const setUser = useSetRecoilState(userAtom);
	const { t } = useTranslation();
	const [state, setState] = useSetState({
		dorms: [],
	});

	// 获取所有宿舍的请求
	const { runAsync: runReqGetDorms, loading: loadingReqGetDorms } =
		useRequest(() => reqGetDorms(), {
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

	return (
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
								showDeleteBtn={false}
							/>
						))}
					</Space>
				) : (
					<Empty description="Жатақхана жоқ" />
				)}
			</div>
		</DormitoryManagementStyledBox>
	);
}
