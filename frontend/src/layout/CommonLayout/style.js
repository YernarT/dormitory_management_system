import styled from 'styled-components';
import { container } from '@/assets/style/common-style';

export const CommonLayoutStyledBox = styled.div`
	height: inherit;

	position: relative;

	overflow: hidden auto;

	.common-layout {
		height: inherit;

		.header,
		.content,
		.footer {
			${container};
		}

		.header {
			display: flex;
			align-items: center;

			user-select: none;

			background-color: #fff;

			.logo {
				width: 54px;
				height: 54px;
				object-fit: cover;
			}

			.title {
				${({ theme }) => theme.typography.title};

				margin-left: 10px;
			}

			.toolbar,
			.user-action {
				margin-left: auto;
				justify-content: flex-end;

				@media screen and (max-width: 760px) {
					width: 260px;
				}

				@media screen and (max-width: 540px) {
					width: 20px;
				}
			}

			.toolbar {
				width: 100%;
			}

			.user-action {
				display: flex;
				align-items: center;
				gap: 15px;
			}
		}

		.content {
			height: 100%;

			overflow: hidden;
		}

		.footer {
			${({ theme }) => theme.typography.secondary};
			text-align: center;

			position: relative;

			&::before {
				content: '';

				width: 100%;
				height: 1px;

				background: linear-gradient(
					to right,
					transparent,
					rgba(0, 0, 0, 0.15),
					transparent
				);

				position: absolute;
				top: 0;
				left: 0;
			}
		}
	}
`;
