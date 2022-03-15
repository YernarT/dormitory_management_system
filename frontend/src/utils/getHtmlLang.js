export default function getHtmlLang(locale) {
	switch (locale) {
		case 'kkKZ':
			return 'kk';
		case 'zhCN':
			return 'zh-Hans';
		case 'enUS':
		default:
			return 'en';
	}
}
