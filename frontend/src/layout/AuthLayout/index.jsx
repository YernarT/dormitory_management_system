import React, { memo } from 'react';

import { CommonLayout } from '@/layout';
import { AuthLayoutStyledBox } from './style';

export default memo(function AuthLayout({ children }) {
	return (
		<CommonLayout>
			<AuthLayoutStyledBox>{children}</AuthLayoutStyledBox>
		</CommonLayout>
	);
});
