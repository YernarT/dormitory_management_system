import styled from 'styled-components';

import { container } from '@/assets/style';

export const FooterStyled = styled.footer`
	height: 24px;
	line-height: 24px;
	text-align: center;

	font-size: 0.72rem;
	font-weight: bolder;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;

	${container('padding')}
`;
