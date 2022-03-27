import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreation, useResponsive, useSafeState } from 'ahooks';

import { Tabs } from 'antd';
import {
	UserOutlined,
	LaptopOutlined,
	NotificationOutlined,
} from '@ant-design/icons';
import { CommonLayout } from '@/layout';
import BasicInfo from './BasicInfo';
import { ProfilePageStyledBox } from './style';

const { TabPane } = Tabs;

export default function ProfilePage() {
	const { t } = useTranslation();
	const responsive = useResponsive();

	const profileTabs = useCreation(
		() => [
			{
				key: 'basic_infomation',
				tabName: 'Негізгі инфо.',
				tabContent: <BasicInfo />,
			},
			{
				key: 'change_password',
				tabName: 'Құпия сөзді өзгерту',
				tabContent: <BasicInfo />,
			},
			{ key: 'other', tabName: 'Басқа', tabContent: <BasicInfo /> },
		],
		[],
	);

	return (
		<CommonLayout>
			<ProfilePageStyledBox>
				<Tabs
					tabPosition={responsive.md === false ? 'top' : 'left'}
					className="profile-tabs">
					{profileTabs.map(({ key, tabName, tabContent }) => (
						<TabPane tab={tabName} key={key}>
							{tabContent}
						</TabPane>
					))}
				</Tabs>
			</ProfilePageStyledBox>
		</CommonLayout>
	);
}
