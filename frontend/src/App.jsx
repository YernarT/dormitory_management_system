import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { RouteGuard, CssBaseLine } from '@/components/common';

import { useEventListener, useCreation } from 'ahooks';
import { localStorage } from '@/utils';

import { useRecoilValue } from 'recoil';
import { userAtom, pageAtom } from '@/store';

import getTheme from '@/assets/theme';
import routes from '@/routes';

export default function App() {
	const user = useRecoilValue(userAtom);
	const page = useRecoilValue(pageAtom);

	// Refresh the page to save the data in Recoil to LocalStorage
	useEventListener('beforeunload', () => {
		localStorage.set('user', user);
		localStorage.set('page', page);
	});

	// Theme object
	const theme = useCreation(() => getTheme(), []);

	return (
		// styled 主题
		<StyledThemeProvider theme={theme}>
			<BrowserRouter>
				{/* 全局样式 */}
				<CssBaseLine />
				{/* 路由守卫 */}
				<RouteGuard routes={routes} />
			</BrowserRouter>
		</StyledThemeProvider>
	);
}
