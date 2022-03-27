import { css } from 'styled-components';

export const container = css`
	& {
		width: 100%;
		margin-right: auto;
		margin-left: auto;
		padding-left: 12px;
		padding-right: 12px;
	}
	@media (min-width: 576px) {
		& {
			max-width: 540px;
		}
	}
	@media (min-width: 768px) {
		& {
			max-width: 720px;
		}
	}
	@media (min-width: 992px) {
		& {
			max-width: 960px;
		}
	}
	@media (min-width: 1200px) {
		& {
			max-width: 1140px;
		}
	}
	@media (min-width: 1400px) {
		& {
			max-width: 1140px;
		}
	}
`;

export const hideScrollbar = css`
	&::-webkit-scrollbar {
		width: 0;
		height: 0;

		background-color: transparent;
	}
`;
