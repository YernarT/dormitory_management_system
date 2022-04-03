import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { pageAtom } from '@/store';

import { useCreation, useResponsive } from 'ahooks';

import { Tabs } from 'antd';
import { CommonLayout } from '@/layout';
import Feedback from './Feedback';
import City from './City';
import Dorm from './Dorm';
import { HomePageStyledBox } from './style';

const { TabPane } = Tabs;

export default function HomePage() {
	const { t } = useTranslation();
	const responsive = useResponsive();
	const page = useRecoilValue(pageAtom);

	const siteAdminTabs = useCreation(
		() => [
			{
				key: 'feedback',
				tabName: '用户反馈',
				tabContent: <Feedback />,
			},
			{
				key: 'city',
				tabName: '城市',
				tabContent: <City />,
			},
			{
				key: 'dorm',
				tabName: '宿舍',
				tabContent: <Dorm />,
			},
		],
		[page.locale],
	);

	return (
		<CommonLayout>
			<HomePageStyledBox>
				<Tabs
					centered
					tabPosition={responsive.md === false ? 'top' : 'left'}
					className="site-admin-tabs">
					{siteAdminTabs.map(({ key, tabName, tabContent }) => (
						<TabPane tab={tabName} key={key}>
							{tabContent}
						</TabPane>
					))}
				</Tabs>
			</HomePageStyledBox>
		</CommonLayout>
	);
}
