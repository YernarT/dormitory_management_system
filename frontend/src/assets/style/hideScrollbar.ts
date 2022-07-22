import { css } from 'styled-components';

/**
 * 隐藏 滚动条
 */

export default css`
	&::-webkit-scrollbar {
		width: 0;
		height: 0;

		background-color: transparent;
	}
`;
