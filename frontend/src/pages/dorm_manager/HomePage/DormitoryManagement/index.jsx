import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';
import { useTranslation } from 'react-i18next';

import { useRequest, useMount, useSetState } from 'ahooks';
import { reqGetMyDorm, reqCreateDorm } from '@/service/api/dorm-manager-api';

import { message as antdMessage, Button, Card } from 'antd';
import { DormitoryManagementStyledBox } from './style';

export default function DormitoryManagement() {
	const setUser = useSetRecoilState(userAtom);
	const { t } = useTranslation();
	const [state, setState] = useSetState({
		dorm: undefined,
	});

	const { runAsync: runReqGetMyDorm, loading: loadingReqGetMyDorm } =
		useRequest(() => reqGetMyDorm(), {
			manual: true,
		});

	useMount(() => {
		runReqGetMyDorm()
			.then(({ dorms }) => {
				setState(dorms[0]);
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
			{state.dorm ? (
				<p>Менім басқарған жатақханам: {state.dorm.id}</p>
			) : (
				<p>Жатақхана жоқ, құрыңыз</p>
			)}
		</DormitoryManagementStyledBox>
	);
}
