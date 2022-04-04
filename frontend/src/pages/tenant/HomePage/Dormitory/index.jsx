import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';
import { useTranslation } from 'react-i18next';

import { useRequest, useMount, useSetState } from 'ahooks';
import { reqGetAllDorms } from '@/service/api/tenant-api';

import { message as antdMessage, Button, Card, Empty } from 'antd';
import { DormitoryStyledBox } from './style';

export default function Dormitory() {
	const setUser = useSetRecoilState(userAtom);
	const { t } = useTranslation();
	const [state, setState] = useSetState({
		dorms: [],
	});

	const { runAsync: runReqGetAllDorm, loading: loadingReqGetAllDorm } =
		useRequest(() => reqGetAllDorms(), {
			manual: true,
		});

	useMount(() => {
		runReqGetAllDorm()
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
		<DormitoryStyledBox>
			{state.dorms.length ? (
				<ul>
					{state.dorms.map(dorm => (
						<li key={dorm.id}>Жатақхана атауы: {dorm.name}</li>
					))}
				</ul>
			) : (
				<Empty description="Қазірше жатақхана жоқ" />
			)}
		</DormitoryStyledBox>
	);
}
