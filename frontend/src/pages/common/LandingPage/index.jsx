import React from 'react';

import { Result } from 'antd';
import { CommonLayout } from '@/layout';
import { LandingPageStyledBox } from './style';

export default function LandingPage() {
	return (
		<CommonLayout>
			<LandingPageStyledBox>
				<Result status="success" />
			</LandingPageStyledBox>
		</CommonLayout>
	);
}
