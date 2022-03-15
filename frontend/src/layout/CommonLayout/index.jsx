import React, { memo } from 'react';

import Header from './Header';
import Content from './Content';
import { CommonLayoutStyledBox } from './style';

export default memo(function CommonLayout({ children }) {
	return (
		<CommonLayoutStyledBox>
			<Header />
			<Content>{children}</Content>
		</CommonLayoutStyledBox>
	);
});
