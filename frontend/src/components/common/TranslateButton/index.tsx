import { memo } from 'react';
import i18next from 'i18next';

import { useSetRecoilState } from 'recoil';
import { pageAtom } from '@/store';

import { getHtmlLang } from '@/utils';

import { AiOutlineTranslation } from 'react-icons/ai';
import { TranslateButtonStyled } from './style';

/**
 * 切换语言
 */
export default memo(function TranslateButton() {
	const setPage = useSetRecoilState(pageAtom);

	// 处理 切换语言
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
		<TranslateButtonStyled
			type="primary"
			onClick={handleTranslate}
			icon={<AiOutlineTranslation className="icon" />}
		/>
	);
});
