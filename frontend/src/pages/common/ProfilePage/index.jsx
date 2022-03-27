import React from 'react';
import { useTranslation } from 'react-i18next';

import { useCreation, useResponsive } from 'ahooks';

import { Tabs } from 'antd';
import { CommonLayout } from '@/layout';
import BasicInfo from './BasicInfo';
import ChangePassword from './ChangePassword';
import Other from './Other';
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
				tabContent: <ChangePassword />,
			},
			{ key: 'other', tabName: 'Басқа', tabContent: <Other /> },
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
