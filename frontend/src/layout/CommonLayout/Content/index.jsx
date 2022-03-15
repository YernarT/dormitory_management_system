import React, { memo } from 'react';

import { ContentStyledBox } from './style';

export default memo(function Content({ children }) {
	return <ContentStyledBox>{children}</ContentStyledBox>;
});
