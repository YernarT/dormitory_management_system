import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { userAtom, pageAtom } from '@/store';
import { useCreation } from 'ahooks';

import { Layout, Menu, Button } from 'antd';
import {
	UserOutlined,
	NotificationOutlined,
	CompassOutlined,
	TranslationOutlined,
} from '@ant-design/icons';
import { CommonLayoutStyledBox } from './style';

import { favicon } from '@/assets/image';

const { Header, Content, Footer } = Layout;

export default memo(function CommonLayout({ children }) {
	const history = useHistory();
	const { t } = useTranslation();
	const user = useRecoilValue(userAtom);
	const setPage = useSetRecoilState(pageAtom);

	const isLogin = useCreation(() => Boolean(user.jwt), [user.jwt]);

	const handleToolbarClick = ({ key }) => {
		history.push(`/auth/login?form=${key}`);
	};

	const handleTranslate = () => {
		setPage(prevState => {
			if (prevState.locale === 'kkKZ') {
				i18next.changeLanguage('enUS');
				return { ...prevState, locale: 'enUS' };
			}

			i18next.changeLanguage('kkKZ');
			return { ...prevState, locale: 'kkKZ' };
		});
	};

	return (
		<CommonLayoutStyledBox>
			<Layout className="common-layout">
				<Header className="header">
					<img src={favicon} alt="Logo" className="logo" />
					<h2 className="title">{t('header_site_name_short')}</h2>

					{isLogin ? (
						<Button
							className="user-action"
							onClick={() => {
								history.push('/profile');
							}}>
							<UserOutlined />
						</Button>
					) : (
						<>
							<Menu
								className="toolbar"
								mode="horizontal"
								onClick={handleToolbarClick}>
								<Menu.Item key="publish" icon={<NotificationOutlined />}>
									{t('header_publish')}
								</Menu.Item>
								<Menu.Item key="seek" icon={<CompassOutlined />}>
									{t('header_seek')}
								</Menu.Item>
							</Menu>

							<Button onClick={handleTranslate}>
								<TranslationOutlined />
							</Button>
						</>
					)}
				</Header>

				<Content className="content">{children}</Content>

				<Footer className="footer">
					{t('footer_site_name')} ©2022 IT IS IT
				</Footer>
			</Layout>
		</CommonLayoutStyledBox>
	);
});
