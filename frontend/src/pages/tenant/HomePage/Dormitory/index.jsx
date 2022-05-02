import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';
import { useTranslation } from 'react-i18next';

import { useRequest, useSetState, useUpdateEffect } from 'ahooks';
import { reqGetAllDorms } from '@/service/api/tenant-api';
import { fuzzyQuery } from '@/utils';

import { message as antdMessage, Empty, Space, Input } from 'antd';
import { DormCard } from '@/components/dorm';
import { DormitoryStyledBox } from './style';

export default function Dormitory() {
	const history = useHistory();
	const setUser = useSetRecoilState(userAtom);
	const { t } = useTranslation();
	const [state, setState] = useSetState({
		dorms: [],
		dormsSorted: [],
		searchText: '',
	});

	const { loading: loadingReqGetAllDorm } = useRequest(reqGetAllDorms, {
		onSuccess({ dorms }) {
			setState({ dorms, dormsSorted: dorms });
		},
		onError({ message, needExecuteLogout, initialUser }) {
			antdMessage.error(message);

			if (needExecuteLogout) {
				setUser(initialUser);
			}
		},
	});

	useUpdateEffect(() => {
		setState({
			dormsSorted: fuzzyQuery(state.dorms, state.searchText, {
				inquiryMode: 'key',
				keyName: 'name',
			}),
		});
	}, [state.searchText]);

	return (
		<DormitoryStyledBox>
			<div
				className="search-wrap"
				style={{ margin: '4px 8px', marginBottom: '20px' }}>
				<Input
					value={state.searchText}
					onChange={({ target: { value } }) => setState({ searchText: value })}
					placeholder="Атау бойынша іздеу"
				/>
			</div>

			<div className="dorms">
				{state.dormsSorted.length > 0 ? (
					<Space direction="vertical" size={15}>
						{state.dormsSorted.map(dorm => (
							<DormCard
								key={dorm.id}
								dorm={dorm}
								showDeleteBtn={false}
								loading={loadingReqGetAllDorm}
								// clickable
								// onClick={() => {
								// 	history.push('/rooms', { dormId: dorm.id });
								// }}
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
