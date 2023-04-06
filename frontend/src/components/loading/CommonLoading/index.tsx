// i18n
import { useTranslation } from 'react-i18next';

// Scoped style
import classes from './style.module.scss';

// Resource
import { favicon } from '@/assets/image';

export default function CommonLoading() {
	const { t } = useTranslation();
	const translatedText = {
		loadingHelpText: t('commonLoadingHelpText'),
	};

	return (
		<div className={classes.commonLoading}>
			<img className={classes.favicon} src={favicon} alt="DMS LOGO" />

			<p className="help-text">{translatedText.loadingHelpText}</p>
		</div>
	);
}
