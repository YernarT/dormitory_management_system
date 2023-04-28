// React
import { memo, useRef } from 'react';
// React router
import { useHistory } from 'react-router-dom';

// i18n
import { useTranslation } from 'react-i18next';

// Hooks
import { useBoolean, useClickAway } from 'ahooks';

// Scoped style
import classes from './style.module.scss';

export default function MenuBar() {
	const history = useHistory();

	const { t } = useTranslation();

	const translatedText = {
		publish: t('header_publish'),
		seek: t('header_seek'),
	};

	type menuTargetType = 'SEEK' | 'PUBLISH';
	const handleMenuClick = (target: menuTargetType) => {
		if (target === 'PUBLISH') {
			history.push('/auth/login');
		}

		if (target === 'SEEK') {
			history.push('/dormitories');
		}
	};

	const [navListVisible, { setFalse: closeNavList, toggle: toggleNavList }] =
		useBoolean(false);

	const navListRef = useRef<HTMLUListElement>(null);
	useClickAway(closeNavList, navListRef);

	return (
		<nav navListVisible={navListVisible}>
			<div className="item" onClick={() => handleMenuClick('PUBLISH')}>
				<AiOutlineNotification className="icon" />
				<span className="text">{translatedText.publish}</span>
			</div>

			<div className="item" onClick={() => handleMenuClick('SEEK')}>
				<AiOutlineCompass className="icon" />
				<span className="text">{translatedText.seek}</span>
			</div>

			<RiMenu4Line
				className="burger-btn"
				onClick={e => {
					e.stopPropagation();
					toggleNavList();
				}}
			/>

			<ul className="navlist" ref={navListRef}>
				<li className="item" onClick={() => handleMenuClick('PUBLISH')}>
					<AiOutlineNotification className="icon" />
					<span className="text">{translatedText.publish}</span>
				</li>

				<li className="item" onClick={() => handleMenuClick('SEEK')}>
					<AiOutlineCompass className="icon" />
					<span className="text">{translatedText.seek}</span>
				</li>
			</ul>
		</nav>
	);
}
