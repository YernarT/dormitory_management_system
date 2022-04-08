import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { pageAtom } from '@/store';

import { useCreation, useResponsive } from 'ahooks';

import { Tabs } from 'antd';
import { CommonLayout } from '@/layout';
import BasicInfo from './BasicInfo';
import ChangePassword from './ChangePassword';
import Notifications from './Notifications';
import Other from './Other';
import { ProfilePageStyledBox } from './style';

const { TabPane } = Tabs;

export default function ProfilePage() {
	const { t } = useTranslation();
	const responsive = useResponsive();
	const page = useRecoilValue(pageAtom);

	const profileTabs = useCreation(
		() => [
			{
				key: 'basic_infomation',
				tabName: t('profile_tabName_basic_infomation'),
				tabContent: <BasicInfo />,
			},
			{
				key: 'change_password',
				tabName: t('profile_tabName_change_password'),
				tabContent: <ChangePassword />,
			},
			{
				key: 'notifications',
				tabName: t('profile_tabName_notifications'),
				tabContent: <Notifications />,
			},
			{
				key: 'other',
				tabName: t('profile_tabName_other'),
				tabContent: <Other />,
			},
		],
		[page.locale],
	);

	return (
		<CommonLayout>
			<ProfilePageStyledBox>
				<Tabs
					centered
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
