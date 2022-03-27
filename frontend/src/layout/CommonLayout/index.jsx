import React, { memo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { userAtom, pageAtom } from '@/store';
import { useCreation, useSafeState } from 'ahooks';

import { getHtmlLang } from '@/utils';

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

	const isLogin = useCreation(() => Boolean(user.token), [user.token]);

	const [selectedKeys, setSelectedKeys] = useSafeState([]);
	useEffect(() => {
		if (history.location.pathname.includes('auth')) {
			if (history.location.search.includes('publish')) {
				setSelectedKeys('publish');
			}

			if (history.location.search.includes('seek')) {
				setSelectedKeys('seek');
			}
		}
	}, [history.location]);

	const handleToolbarClick = ({ key }) => {
		// 是否在 auth 相关页面
		let inAuthPage = history.location.pathname.includes('auth');
		if (inAuthPage) {
			history.replace({ search: `?form=${key}` });
		} else {
			history.push(`/auth/login?form=${key}`);
		}
	};

	const handleTranslate = () => {
		setPage(prevState => {
			if (prevState.locale === 'kkKZ') {
				document.documentElement.lang = getHtmlLang('enUS');
				i18next.changeLanguage('enUS');
				return { ...prevState, locale: 'enUS' };
			}

			document.documentElement.lang = getHtmlLang('kkKZ');
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
						<div className="user-action">
							<Button onClick={handleTranslate}>
								<TranslationOutlined />
							</Button>
							<Button
								onClick={() => {
									history.push('/profile');
								}}>
								<UserOutlined />
							</Button>
						</div>
					) : (
						<>
							<Menu
								className="toolbar"
								mode="horizontal"
								onClick={handleToolbarClick}
								selectedKeys={selectedKeys}>
								<Menu.Item
									key="publish"
									icon={<NotificationOutlined />}
									title={t('header_publish')}>
									{t('header_publish')}
								</Menu.Item>
								<Menu.Item
									key="seek"
									icon={<CompassOutlined />}
									title={t('header_seek')}>
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
