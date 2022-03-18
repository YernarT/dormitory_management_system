import React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonLayout } from '@/layout';
import { LandingPageStyledBox } from './style';

import { welcomeBG } from '@/assets/image';

export default function LandingPage() {
	const { t } = useTranslation();
	return (
		<CommonLayout>
			<LandingPageStyledBox>
				<div className="welcome">
					<img src={welcomeBG} alt="background image" />
					<div className="info">
						<h1 className="title">{t('footer_site_name')}</h1>
						<h3 className="sub-title">{t('landingP_welcome_subTitle')}</h3>
					</div>
				</div>
			</LandingPageStyledBox>
		</CommonLayout>
	);
}
