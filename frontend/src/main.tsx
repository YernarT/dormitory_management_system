// React & 周边库
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { RecoilRoot } from 'recoil';

// 业务库
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { kkKZ, enUS } from '@/i18n';

// 工具函数
import { localStorage, getHtmlLang } from '@/utils';
import { defaultPageState } from '@/store';

// 组件
import { SafeArea } from './components/common';
import App from './App';

// Initialize language, get it from LocalStorage
const page = localStorage.get('page', defaultPageState);

i18next
	.use(initReactI18next)
	.use(intervalPlural)
	.init({
		resources: {
			kkKZ: {
				translation: kkKZ,
			},
			enUS: {
				translation: enUS,
			},
		},
		lng: page.locale,
		fallbackLng: 'kkKZ',
		compatibilityJSON: 'v3',
	});

render(
	<StrictMode>
		<RecoilRoot>
			<SafeArea>
				<App />
			</SafeArea>
		</RecoilRoot>
	</StrictMode>,
	document.getElementById('root'),
	() => {
		document.documentElement.lang = getHtmlLang(page.locale);
	},
);
