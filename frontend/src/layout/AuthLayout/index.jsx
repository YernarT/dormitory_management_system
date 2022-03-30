import React, { memo } from 'react';

import { CommonLayout } from '@/layout';
import { AuthLayoutStyledBox, authLayoutWrapperStyle } from './style';

export default memo(function AuthLayout({ children }) {
	return (
		<CommonLayout extraStyle={authLayoutWrapperStyle}>
			<AuthLayoutStyledBox>{children}</AuthLayoutStyledBox>
		</CommonLayout>
	);
});
