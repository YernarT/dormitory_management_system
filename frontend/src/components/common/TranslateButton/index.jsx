import React, { memo } from 'react';
import i18next from 'i18next';

import { useSetRecoilState } from 'recoil';
import { pageAtom } from '@/store';

import { getHtmlLang } from '@/utils';

import { Button } from 'antd';
import { TranslationOutlined } from '@ant-design/icons';

export default memo(function TranslateButton() {
	const setPage = useSetRecoilState(pageAtom);

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
		<Button onClick={handleTranslate}>
			<TranslationOutlined />
		</Button>
	);
});
