import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Layout } from 'antd';

import Header from './Header';
import { CommonLayoutStyledBox } from './style';

const { Content, Footer } = Layout;

export default memo(function CommonLayout({ children, extraStyle = {} }) {
	const { t } = useTranslation();

	return (
		<CommonLayoutStyledBox extraStyle={extraStyle}>
			<Layout className="common-layout">
				<Header className="header" />

				<Content className="content">{children}</Content>

				<Footer className="footer">
					{t('footer_site_name')} ©2022 IT IS IT
				</Footer>
			</Layout>
		</CommonLayoutStyledBox>
	);
});
