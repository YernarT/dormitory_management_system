import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from 'antd';
import { FooterStyled } from './style';

export default memo(function Footer() {
	const { t } = useTranslation();
	const footerText = `${t('footer_site_name')} ©2022 IT IS IT`;

	return (
		<FooterStyled>
			<Typography.Text className="footer-text">{footerText}</Typography.Text>
		</FooterStyled>
	);
});
