// React & 周边库
import { BrowserRouter } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom, pageAtom } from '@/store';

// 业务库
import { useEventListener, useCreation } from 'ahooks';
import { localStorage, getAntdLocale } from '@/utils';

// 组件
import {
	ConfigProvider as AntdConfigProvider,
	message,
	notification,
} from 'antd';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { RouteGuard, CssBaseLine } from '@/components/common';

// 其他资源
import { theme } from '@/assets/theme';
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

	// Refresh the page to save the data in Recoil to LocalStorage
	useEventListener('beforeunload', () => {
		localStorage.set('user', user);
		localStorage.set('page', page);
	});

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
					{/* 路由守卫 */}
					<RouteGuard routes={routes} />
				</BrowserRouter>
			</AntdConfigProvider>
		</StyledThemeProvider>
	);
}
