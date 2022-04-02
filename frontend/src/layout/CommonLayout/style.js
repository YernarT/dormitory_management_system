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

		.content {
			height: 100%;
			overflow: hidden auto;

			@media screen and (max-width: 576px) {
				padding: 0 10px;
			}
		}

		.footer {
			${({ theme }) => theme.typography.secondary};
			font-size: 0.72rem;
			font-weight: bold;
			text-align: center;
			text-overflow: ellipsis;
			white-space: nowrap;

			position: relative;
			overflow: hidden;

			padding-left: 24px;
			padding-right: 24px;

			&::before {
				content: '';

				width: 100%;
				height: 1px;

				background: linear-gradient(
					to right,
					transparent,
					rgba(0, 0, 0, 0.05),
					transparent
				);

				position: absolute;
				top: 0;
				left: 0;
			}
		}
	}

	/* 新特性: 额外样式 */
	${({ extraStyle }) => extraStyle}
`;
