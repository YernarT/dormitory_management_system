import styled from 'styled-components';
import { container } from '@/assets/style';

export const HeaderStyledBox = styled.div`
	height: 72px;
	background-color: 'green';

	.header {
		${container};

		display: flex;
		align-items: center;
		justify-content: space-between;

		.site-title {
			line-height: 72px;
			margin: 0;

			color: #fff;
			text-shadow: 0 0 4px ${({ theme }) => theme.palette.primary.main};
			user-select: none;
		}

		.toolbar {
			display: flex;
			align-items: center;
			gap: 12px;

			color: #fff;

			.options-list {
				background-color: 'green';
			}
		}
	}
`;
