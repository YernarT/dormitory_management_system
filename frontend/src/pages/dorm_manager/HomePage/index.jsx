import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { pageAtom } from '@/store';

import { useCreation, useResponsive } from 'ahooks';

import { Tabs } from 'antd';
import { CommonLayout } from '@/layout';
import DormitoryManagement from './DormitoryManagement';
import ProcessRequest from './ProcessRequest';
import { HomePageStyledBox } from './style';

const { TabPane } = Tabs;

export default function HomePage() {
	const { t } = useTranslation();
	const responsive = useResponsive();
	const page = useRecoilValue(pageAtom);

	const dromManagerTabs = useCreation(
		() => [
			{
				key: 'dormitory_management',
				tabName: t('dorm_manager_tabName_dormitory_management'),
				tabContent: <DormitoryManagement />,
			},
			{
				key: 'process_request',
				tabName: t('dorm_manager_tabName_process_request'),
				tabContent: <ProcessRequest />,
			},
		],
		[page.locale],
	);

	return (
		<CommonLayout>
			<HomePageStyledBox>
				<Tabs
					tabPosition={responsive.md === false ? 'top' : 'left'}
					className="dorm-manager-tabs">
					{dromManagerTabs.map(({ key, tabName, tabContent }) => (
						<TabPane tab={tabName} key={key}>
							{tabContent}
						</TabPane>
					))}
				</Tabs>
			</HomePageStyledBox>
		</CommonLayout>
	);
}
