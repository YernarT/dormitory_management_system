import styled from 'styled-components';

import { layoutStyle, container } from '@/assets/style';

export const GuestLayoutStyled = styled.div`
	${layoutStyle}

	.content {
		/* 减掉 Header 高度 */
		height: calc(100% - 64px);

		position: relative;
		overflow: hidden;

		> * {
			${container('width')}
			height: 100%;
			overflow: hidden auto;
		}
	}
`;
