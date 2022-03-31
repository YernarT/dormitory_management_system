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
			<h2 className="title">{t('header_site_name_short')}</h2>

			{role === 'guest' && <GuestHeader />}
			{role === 'tenant' && <TenantHeader />}
			{role === 'dorm manager' && <DormManagerHeader />}
			{role === 'site admin' && <SiteAdminHeader />}

			{/* public dom */}
			<TranslateButton />
			{isLogin && (
				<Button onClick={toProfile}>
					<UserOutlined />
				</Button>
			)}
		</HeaderStyledBox>
	);
});

const GuestHeader = memo(function GuestHeader() {
	const { t } = useTranslation();
	const history = useHistory();

	const [selectedKeys, setSelectedKeys] = useSafeState('');

	const handleToolbarClick = useMemoizedFn(({ key }) => {
		history.push(`/auth/login?form=${key}`);
	});

	useEffect(() => {
		let usp = new URLSearchParams(history.location.search);
		let form = usp.get('form');

		console.log(form);

		if (form === 'publish') {
			setSelectedKeys('publish');
		}
		if (form === 'seek') {
			setSelectedKeys('seek');
		}
	}, [history.location]);

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
	return <></>;
});

const DormManagerHeader = memo(function DormManagerHeader() {
	return <></>;
});

const SiteAdminHeader = memo(function SiteAdminHeader() {
	return <></>;
});
