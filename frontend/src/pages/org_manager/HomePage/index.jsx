import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { pageAtom, userAtom, dormAtom } from '@/store';

import {
	useCreation,
	useResponsive,
	useSetState,
	useRequest,
	useMount,
} from 'ahooks';
import { reqGetMyOrgaization } from '@/service/api/org-manager-api';

import { Tabs, message as antdMessage } from 'antd';
import { CommonLayout } from '@/layout';
import Organization from './Organization';
import DormitoryManagement from './DormitoryManagement';
import RoomManagement from './RoomManagement';
import ProcessRequest from './ProcessRequest';
import DormitoryManager from './DormitoryManager';

import { HomePageStyledBox } from './style';

const { TabPane } = Tabs;

export default function HomePage() {
	const { t } = useTranslation();
	const setUser = useSetRecoilState(userAtom);
	const responsive = useResponsive();
	const page = useRecoilValue(pageAtom);
	const [dorm, setDorm] = useRecoilState(dormAtom);

	const { runAsync: runReqGetMyOrganization } = useRequest(
		() => reqGetMyOrgaization(),
		{
			manual: true,
		},
	);

	useMount(() => {
		runReqGetMyOrganization()
			.then(({ organization }) =>
				setDorm(prevState => ({ ...prevState, organization })),
			)
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	});

	const orgManagerTabs = useCreation(
		() => [
			{
				key: 'organization',
				tabName: t('org_manager_tabName_organization'),
				tabContent: <Organization />,
			},
			{
				key: 'dormitory_management',
				tabName: t('org_manager_tabName_dormitory_management'),
				tabContent: <DormitoryManagement />,
				disabled: Boolean(!dorm.organization),
			},
			{
				key: 'room_management',
				tabName: t('org_manager_tabName_room_management'),
				tabContent: <RoomManagement />,
			},
			{
				key: 'process_request',
				tabName: t('org_manager_tabName_process_request'),
				tabContent: <ProcessRequest />,
				disabled: Boolean(!dorm.organization),
			},
			{
				key: 'dormitory_manager',
				tabName: t('org_manager_tabName_dormitory_manager'),
				tabContent: <DormitoryManager />,
				disabled: Boolean(!dorm.organization),
			},
		],
		[page.locale, dorm.organization],
	);

	return (
		<CommonLayout>
			<HomePageStyledBox>
				<Tabs
					centered
					tabPosition={responsive.md === false ? 'top' : 'left'}
					className="org-manager-tabs">
					{orgManagerTabs.map(({ key, tabName, tabContent, disabled }) => (
						<TabPane tab={tabName} key={key} disabled={disabled}>
							{tabContent}
						</TabPane>
					))}
				</Tabs>
			</HomePageStyledBox>
		</CommonLayout>
	);
}
