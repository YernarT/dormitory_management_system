import { css } from 'styled-components';

/**
 * 借鉴 Bootstrap 的 container 样式研发
 */

type containerAttrType = 'width' | 'padding';

export default (attr: containerAttrType) => {
	if (attr === 'width') {
		return css`
			width: calc(100% - calc(max(8%, 50px) * 2));
			margin: auto;

			@media screen and (max-width: 768px) {
				width: calc(100% - calc(6% * 2));
			}
			@media screen and (max-width: 576px) {
				width: calc(100% - calc(4% * 2));
			}
		`;
	}

	if (attr === 'padding') {
		return css`
			padding: 0 max(8%, 50px);

			@media screen and (max-width: 768px) {
				padding: 0 6%;
			}
			@media screen and (max-width: 576px) {
				padding: 0 4%;
			}
		`;
	}
};
