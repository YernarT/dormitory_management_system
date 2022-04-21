import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { pageAtom, userAtom, dormAtom } from '@/store';

import { useCreation, useResponsive, useRequest, useMount } from 'ahooks';
import {
	reqGetMyOrgaization,
	reqGetCities,
	reqGetDorms,
	reqGetRooms,
} from '@/service/api/org-manager-api';

import { Tabs, message as antdMessage } from 'antd';
import { CommonLayout } from '@/layout';
import Organization from './Organization';
import DormitoryManagement from './DormitoryManagement';
import RoomManagement from './RoomManagement';
import BedManagement from './BedManagement';
import ProcessRequest from './ProcessRequest';

import { HomePageStyledBox } from './style';

const { TabPane } = Tabs;

export default function HomePage() {
	const { t } = useTranslation();
	const setUser = useSetRecoilState(userAtom);
	const responsive = useResponsive();
	const page = useRecoilValue(pageAtom);
	const [dorm, setDorm] = useRecoilState(dormAtom);

	// 获取机构
	const { runAsync: runReqGetMyOrganization } = useRequest(
		() => reqGetMyOrgaization(),
		{
			manual: true,
		},
	);
	// 获取城市
	const { runAsync: runReqGetCities } = useRequest(() => reqGetCities(), {
		manual: true,
	});
	// 获取宿舍
	const { runAsync: runReqGetDorms } = useRequest(() => reqGetDorms(), {
		manual: true,
	});
	// 获取房间
	const { runAsync: runReqGetRooms } = useRequest(() => reqGetRooms(), {
		manual: true,
	});

	useMount(() => {
		Promise.all([
			runReqGetMyOrganization(),
			runReqGetCities(),
			runReqGetDorms(),
			runReqGetRooms(),
		])
			.then(([{ organization }, { cities }, { dorms }, { rooms }]) => {
				setDorm({
					organization,
					hasCity: Boolean(cities.length),
					hasDorm: Boolean(dorms.length),
					hasRoom: Boolean(rooms.length),
				});
			})
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
				disabled: !dorm.hasDorm,
			},
			{
				key: 'bed_management',
				tabName: t('org_manager_tabName_bed_management'),
				tabContent: <BedManagement />,
				disabled: !dorm.hasRoom,
			},
			{
				key: 'process_request',
				tabName: t('org_manager_tabName_process_request'),
				tabContent: <ProcessRequest />,
				disabled: !dorm.hasRoom,
			},
		],
		[page.locale, dorm],
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
