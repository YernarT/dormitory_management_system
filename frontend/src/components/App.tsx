// React & 周边库
import { BrowserRouter } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { pageAtom } from '@/store';

// 业务库
import { useCreation } from 'ahooks';
import { getAntdLocale } from '@/utils';

// 组件
import {
	ConfigProvider as AntdConfigProvider,
	message,
	notification,
} from 'antd';
import { LayoutTemplate } from '@/components/common';

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
	const page = useRecoilValue(pageAtom);

	// Locale object
	const antdLocale = useCreation(
		() => getAntdLocale(page.locale),
		[page.locale],
	);

	return (
		// Antd 全局配置
		<AntdConfigProvider
			prefixCls="dms"
			iconPrefixCls="dms-icon"
			theme={{
				token: {
					colorPrimary: '#00a884',
				},
			}}
			locale={antdLocale}>
			<BrowserRouter>
				{/* 路由守卫 */}
				<LayoutTemplate />
			</BrowserRouter>
		</AntdConfigProvider>
	);
}
