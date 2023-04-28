// React
import { memo, useRef } from 'react';

// i18n
import { useTranslation } from 'react-i18next';

// 业务库
import { useBoolean, useClickAway } from 'ahooks';

// Icons
import { AiOutlineNotification, AiOutlineCompass } from 'react-icons/ai';
import { RiMenu4Line } from 'react-icons/ri';
// import { TranslateButton } from '@/components/common';

// Scoped style
import classes from './style.module.scss';
// Resouce
import { favicon } from '@/assets/image';

export default memo(function Header() {
	const { t } = useTranslation();

	const translatedText = {
		siteTitle: t('header_site_name_short'),
	};

	return (
		<header className={`itisit-container ${classes.header}`}>
			{/* Brand */}
			<div className="brand">
				{/* Logo */}
				<img src={favicon} alt="DMS LOGO" className="logo" />
				{/* Site title */}
				<span className="title">{translatedText.siteTitle}</span>
			</div>

			{/* <MenuBar /> */}

			{/* <TranslateButton /> */}
		</header>
	);
});
