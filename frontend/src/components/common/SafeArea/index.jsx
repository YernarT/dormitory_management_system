import React, { memo } from 'react';
import { useVh } from '@/hooks';

import { SafeAreaStyleBox } from './style';

export default memo(function SafeArea({ children }) {
	const vh = useVh();

	return <SafeAreaStyleBox vh={vh}>{children}</SafeAreaStyleBox>;
});
