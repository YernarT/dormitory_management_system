import styled from 'styled-components';

import { layoutStyle } from '@/assets/style';

export const GuestLayoutStyled = styled.div`
	${layoutStyle}

	.content {
		/* 减掉 Header, Footer 高度 */
		height: calc(100% - calc(64px + 24px));

		> * {
			height: 100%;
		}
	}
`;
