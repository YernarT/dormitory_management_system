import styled from 'styled-components';

import { layoutStyle } from '@/assets/style';

export const GuestLayoutStyled = styled.div`
	${layoutStyle}

	.content {
		/* 减掉 Header 高度 */
		height: calc(100% - 64px);

		> * {
			height: 100%;
		}
	}
`;
