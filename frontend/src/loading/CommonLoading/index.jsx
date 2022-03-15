import React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonLoadingStyledBox } from './style';

export default function CommonLoading() {
	const { t } = useTranslation();

	return (
		<CommonLoadingStyledBox>
			<span></span>
			<span></span>
			<span></span>
			<h2 className="help-text">{t('commonLoadingHelpText')}</h2>
		</CommonLoadingStyledBox>
	);
}
