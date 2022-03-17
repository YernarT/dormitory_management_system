import React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonLoadingStyledBox } from './style';
import { favicon } from '@/assets/image';

export default function CommonLoading() {
	const { t } = useTranslation();

	return (
		<CommonLoadingStyledBox>
			<img className="favicon" src={favicon} alt="favicon" />
			<h2 className="help-text">{t('commonLoadingHelpText')}</h2>
		</CommonLoadingStyledBox>
	);
}
