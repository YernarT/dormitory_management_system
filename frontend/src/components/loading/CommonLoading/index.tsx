import { useTranslation } from 'react-i18next';

import { Typography } from 'antd';
import { CommonLoadingStyledBox } from './style';

import { favicon } from '@/assets/image';

export default function CommonLoading() {
	const { t } = useTranslation();
	const translatedText = {
		loadingHelpText: t('commonLoadingHelpText'),
	};

	return (
		<CommonLoadingStyledBox>
			<img className="favicon" src={favicon} alt="favicon" />

			<Typography.Title level={3} className="help-text">
				{translatedText.loadingHelpText}
			</Typography.Title>
		</CommonLoadingStyledBox>
	);
}
