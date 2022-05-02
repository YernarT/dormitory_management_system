import React, { memo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store';
import { useCreation, useSafeState, useMemoizedFn } from 'ahooks';

import { Menu, Button } from 'antd';
import {
	UserOutlined,
	NotificationOutlined,
	CompassOutlined,
} from '@ant-design/icons';
import { TranslateButton } from '@/components/common';
import { HeaderStyledBox } from './style';

import { favicon } from '@/assets/image';

export default memo(function Header({ className }) {
	const history = useHistory();
	const { t } = useTranslation();
	const { role } = useRecoilValue(userAtom);

	const isLogin = useCreation(() => role !== 'guest', [role]);
	const toProfile = useMemoizedFn(() => {
		if (history.location.pathname !== '/profile') {
			history.push('/profile');
		}
	});

	return (
		<HeaderStyledBox className={className}>
			{/* public dom */}
			<img src={favicon} alt="Logo" className="logo" />
			{/* <h2 className="title">{t('header_site_name_short')}</h2> */}

			{role === 'guest' && <GuestHeader />}
			{role === 'tenant' && <TenantHeader />}
			{role === 'dorm manager' && <DormManagerHeader />}
			{role === 'org manager' && <OrgManagerHeader />}
			{role === 'site admin' && <SiteAdminHeader />}

			{/* public dom */}
			<TranslateButton />
			{isLogin && (
				<Button onClick={toProfile} className="user-action">
					<UserOutlined />
				</Button>
			)}
		</HeaderStyledBox>
	);
});

const GuestHeader = memo(function GuestHeader() {
	const history = useHistory();
	const { t } = useTranslation();

	const [selectedKeys, setSelectedKeys] = useSafeState('');

	const handleToolbarClick = useMemoizedFn(({ key }) => {
		let inAuthPage = history.location.pathname.includes('auth');

		if (inAuthPage) {
			history.replace({ search: `?form=${key}` });
		} else {
			history.push(`/auth/login?form=${key}`);
		}

		return;
	});

	useEffect(() => {
		let inAuthPage = history.location.pathname.includes('auth');

		if (inAuthPage) {
			let usp = new URLSearchParams(history.location.search);
			let form = usp.get('form');

			if (form === 'publish') {
				setSelectedKeys('publish');
			}
			if (form === 'seek') {
				setSelectedKeys('seek');
			}

			// 初始化 search params
			if (form !== 'publish' && form !== 'publish') {
				history.replace({ search: '?form=seek' });
			}
		}
	}, []);

	useEffect(() => {
		let unListen = history.listen(({ search }) => {
			let inAuthPage = history.location.pathname.includes('auth');

			if (inAuthPage) {
				let usp = new URLSearchParams(search);
				let form = usp.get('form');

				if (form === 'publish') {
					setSelectedKeys('publish');
				}
				if (form === 'seek') {
					setSelectedKeys('seek');
				}
			}
		});

		return () => unListen();
	}, [history]);

	return (
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
			<Menu.Item key="seek" icon={<CompassOutlined />} title={t('header_seek')}>
				{t('header_seek')}
			</Menu.Item>
		</Menu>
	);
});

const TenantHeader = memo(function TenantHeader() {
	return <div className="toolbar" />;
});

const OrgManagerHeader = memo(function OrgManagerHeader() {
	return <div className="toolbar" />;
});

const DormManagerHeader = memo(function DormManagerHeader() {
	return <div className="toolbar" />;
});

const SiteAdminHeader = memo(function SiteAdminHeader() {
	return <div className="toolbar" />;
});
