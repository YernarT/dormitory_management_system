import React, { memo, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { pageAtom } from '@/store';

import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useBoolean, useClickAway, useCreation } from 'ahooks';
import { getHtmlLang } from '@/utils';

// import { IconButton, Popper, MenuList, MenuItem } from '@mui/material';
// import { TranslateOutlined } from '@mui/icons-material';

export default memo(function TranslateBtn() {
	const [page, setPage] = useRecoilState(pageAtom);
	const { t } = useTranslation();

	const languageList = useCreation(() => Object.keys(i18next.store.data), []);

	const [
		optionsVisible,
		{ setFalse: closeOptionList, toggle: toggleOptionList },
	] = useBoolean(false);

	const handleMenuClick = locale => {
		closeOptionList();
		document.documentElement.lang = getHtmlLang(locale);
		i18next.changeLanguage(locale);
		setPage(currVal => ({ ...currVal, locale }));
	};

	const translateRef = useRef(null);
	useClickAway(() => {
		closeOptionList();
	}, translateRef);

	return (
		<>
			{/* <IconButton color="inherit" onClick={toggleOptionList} ref={translateRef}>
				<TranslateOutlined />
			</IconButton>

			<Popper
				open={optionsVisible}
				anchorEl={translateRef.current}
				disablePortal>
				<MenuList className="options-list">
					{languageList.map(lang => (
						<MenuItem
							key={lang}
							selected={lang === page.locale}
							onClick={() => lang !== page.locale && handleMenuClick(lang)}>
							{t(lang)}
						</MenuItem>
					))}
				</MenuList>
			</Popper> */}
		</>
	);
});
