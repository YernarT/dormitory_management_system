import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import {
	ConfigProvider as AntdConfigProvider,
	message,
	notification,
} from 'antd';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { RouteGuard, CssBaseLine } from '@/components/common';

import { useEventListener, useCreation } from 'ahooks';
import { localStorage, getAntdLocale } from '@/utils';

import { useRecoilValue } from 'recoil';
import { userAtom, pageAtom, dormAtom } from '@/store';

import getTheme from '@/assets/theme';
import { AntdComponentStyleModify } from '@/assets/style/antd-mod-style';
import routes from '@/routes';

// global config for antd message
message.config({
	prefixCls: 'dms-message',
});

// global config for notification
notification.config({
	prefixCls: 'dms-notification',
	placement: 'bottomRight',
});

export default function App() {
	const user = useRecoilValue(userAtom);
	const page = useRecoilValue(pageAtom);
	const dorm = useRecoilValue(dormAtom);

	// Refresh the page to save the data in Recoil to LocalStorage
	useEventListener('beforeunload', () => {
		localStorage.set('user', user);
		localStorage.set('page', page);
		localStorage.set('dorm', dorm);
	});

	// Theme object
	const theme = useCreation(() => getTheme(), []);
	// Locale object
	const locale = useCreation(() => getAntdLocale(page.locale), [page.locale]);

	return (
		// styled 主题
		<StyledThemeProvider theme={theme}>
			<AntdConfigProvider
				prefixCls="dms"
				iconPrefixCls="dms-icon"
				locale={locale}>
				<BrowserRouter>
					{/* 全局样式 */}
					<CssBaseLine />
					{/* Antd design 组件样式重写 */}
					<AntdComponentStyleModify />
					{/* 路由守卫 */}
					<RouteGuard routes={routes} />
				</BrowserRouter>
			</AntdConfigProvider>
		</StyledThemeProvider>
	);
}
