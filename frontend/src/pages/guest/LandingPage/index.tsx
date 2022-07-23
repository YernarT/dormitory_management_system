import { useTranslation } from 'react-i18next';

import { Typography } from 'antd';
import { GuestLayout } from '@/components/layout';
import { LandingPageStyledBox } from './style';

import { universityPhoto } from '@/assets/image';

export default function LandingPage() {
	const { t } = useTranslation();
	const [title, subTitle] = [
		t('footer_site_name'),
		t('landingP_welcome_subTitle'),
	];

	return (
		<GuestLayout>
			<LandingPageStyledBox>
				<img
					src={universityPhoto}
					alt="университеттің негізгі ғимарат суреті"
				/>

				<div className="info">
					<Typography.Title level={1} className="title">
						{title}
					</Typography.Title>
					<Typography.Title level={3} className="sub-title">
						{subTitle}
					</Typography.Title>
				</div>
			</LandingPageStyledBox>
		</GuestLayout>
	);
}
