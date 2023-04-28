// i18n
import { useTranslation } from 'react-i18next';

// Scoped style
import classes from './style.module.scss';

// Resource
import { universityPhoto } from '@/assets/image';

export default function LandingPage() {
	const { t } = useTranslation();
	const [title, subTitle] = [
		t('footer_site_name'),
		t('landingP_welcome_subTitle'),
	];

	return (
		<main className={classes.landingPage}>
			<img src={universityPhoto} alt="университеттің негізгі ғимарат суреті" />

			<div className="info">
				<h1 className="title">{title}</h1>
				<h2 className="sub-title">{subTitle}</h2>
			</div>
		</main>
	);
}
