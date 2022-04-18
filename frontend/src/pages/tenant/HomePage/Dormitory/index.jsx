import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';
import { useTranslation } from 'react-i18next';

import { useRequest, useSetState } from 'ahooks';
import { reqGetAllDorms } from '@/service/api/tenant-api';

import { message as antdMessage, Empty, Space } from 'antd';
import { DormCard } from '@/components/dorm';
import { DormitoryStyledBox } from './style';

export default function Dormitory() {
	const history = useHistory();
	const setUser = useSetRecoilState(userAtom);
	const { t } = useTranslation();
	const [state, setState] = useSetState({
		dorms: [],
	});

	const { loading: loadingReqGetAllDorm } = useRequest(reqGetAllDorms, {
		onSuccess({ dorms }) {
			setState({ dorms });
		},
		onError({ message, needExecuteLogout, initialUser }) {
			antdMessage.error(message);

			if (needExecuteLogout) {
				setUser(initialUser);
			}
		},
	});

	return (
		<DormitoryStyledBox>
			<div className="dorms">
				{state.dorms.length > 0 ? (
					<Space direction="vertical" size={15}>
						{state.dorms.map(dorm => (
							<DormCard
								key={dorm.id}
								dorm={dorm}
								showDeleteBtn={false}
								loading={loadingReqGetAllDorm}
								clickable
								onClick={() => {
									history.push('/rooms', { dormId: dorm.id });
								}}
							/>
						))}
					</Space>
				) : (
					<Empty description="Жатақхана жоқ" />
				)}
			</div>
		</DormitoryStyledBox>
	);
}
