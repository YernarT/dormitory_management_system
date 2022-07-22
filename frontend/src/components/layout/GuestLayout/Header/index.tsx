// React & 周边库
import { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// 业务库
import { useBoolean, useClickAway } from 'ahooks';

// 组件
import { Typography } from 'antd';
import { AiOutlineNotification, AiOutlineCompass } from 'react-icons/ai';
import { RiMenu4Line } from 'react-icons/ri';
import { TranslateButton } from '@/components/common';
// 样式组件
import { HeaderStyled, MenuBarStyled } from './style';
// 资源文件
import { favicon } from '@/assets/image';

interface HeaderProps {
	className?: string;
}

export default memo(function Header(props: HeaderProps) {
	const { t } = useTranslation();
	const translatedText = {
		siteTitle: t('header_site_name_short'),
	};

	return (
		<HeaderStyled {...props}>
			{/* Logo */}
			<img src={favicon} alt="Logo" className="logo" />
			{/* Site title */}
			<Typography.Title level={2} className="title">
				{translatedText.siteTitle}
			</Typography.Title>

			<MenuBar />

			<TranslateButton />
		</HeaderStyled>
	);
});

function MenuBar() {
	const { t } = useTranslation();
	const translatedText = {
		publish: t('header_publish'),
		seek: t('header_seek'),
	};

	type menuTargetType = 'SEEK' | 'PUBLISH';
	const handleMenuClick = (target: menuTargetType) => {
		if (target === 'PUBLISH') {
		}

		if (target === 'SEEK') {
		}
	};

	const [navListVisible, { setFalse: closeNavList, toggle: toggleNavList }] =
		useBoolean(false);

	const navListRef = useRef<HTMLUListElement>(null);
	useClickAway(closeNavList, navListRef);

	return (
		<MenuBarStyled navListVisible={navListVisible}>
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
		</MenuBarStyled>
	);
}
