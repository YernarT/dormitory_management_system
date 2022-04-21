import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { pageAtom } from '@/store';

import { useCreation, useResponsive } from 'ahooks';

import { Tabs } from 'antd';
import { CommonLayout } from '@/layout';
import City from './City';
import Statistic from './Statistic';
import { HomePageStyledBox } from './style';

const { TabPane } = Tabs;

export default function HomePage() {
	const { t } = useTranslation();
	const responsive = useResponsive();
	const page = useRecoilValue(pageAtom);

	const siteAdminTabs = useCreation(
		() => [
			{
				key: 'city',
				tabName: t('site_admin_tabName_city'),
				tabContent: <City />,
			},
			{
				key: 'statistic',
				tabName: t('site_admin_tabName_statistic'),
				tabContent: <Statistic />,
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
