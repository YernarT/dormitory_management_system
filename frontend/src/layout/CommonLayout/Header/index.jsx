import React, { memo } from 'react';

import { HeaderStyledBox } from './style';
import Searchbar from './Searchbar';
import TranslateBtn from './TranslateBtn';

export default memo(function Header() {
	return (
		<HeaderStyledBox>
			<header className="header">
				<h2 className="site-title">Bilimbilim</h2>
				<div className="toolbar">
					<Searchbar />
					<TranslateBtn />
				</div>
			</header>
		</HeaderStyledBox>
	);
});
