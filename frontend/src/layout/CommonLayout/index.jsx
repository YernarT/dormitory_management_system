import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store';
import { useCreation } from 'ahooks';

import { Layout, Menu, Button } from 'antd';
import {
	UserOutlined,
	NotificationOutlined,
	CompassOutlined,
} from '@ant-design/icons';
import { CommonLayoutStyledBox } from './style';

import { favicon } from '@/assets/image';

const { Header, Content, Footer } = Layout;

export default memo(function CommonLayout({ children }) {
	const history = useHistory();
	const user = useRecoilValue(userAtom);

	const isLogin = useCreation(() => Boolean(user.jwt), [user.jwt]);

	const handleToolbarClick = ({ key }) => {
		history.push(`/auth/login/${key}`);
	};

	return (
		<CommonLayoutStyledBox>
			<Layout className="common-layout">
				<Header className="header">
					<img src={favicon} alt="Logo" className="logo" />
					<h2 className="title">ЖБЖ</h2>

					{isLogin ? (
						<Button
							className="user-action"
							onClick={() => {
								history.push('/profile');
							}}>
							<UserOutlined />
						</Button>
					) : (
						<Menu
							className="toolbar"
							mode="horizontal"
							onClick={handleToolbarClick}>
							<Menu.Item key="publish" icon={<NotificationOutlined />}>
								Жатақхана жариялау
							</Menu.Item>
							<Menu.Item key="seek" icon={<CompassOutlined />}>
								Жатақхана іздеу
							</Menu.Item>
						</Menu>
					)}
				</Header>

				<Content className="content">{children}</Content>

				<Footer className="footer">
					Жатақхананы Басқару Жүйесі ©2022 IT IS IT
				</Footer>
			</Layout>
		</CommonLayoutStyledBox>
	);
});
