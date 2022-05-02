import styled from 'styled-components';

export const RequestCardStyledBox = styled.div`
	position: relative;

	.delete-btn {
		position: absolute;
		top: 6px;
		right: 6px;

		cursor: pointer;
		color: ${({ theme }) => theme.palette.error};

		display: ${({ showDeleteBtn }) => {
			if (showDeleteBtn === true) {
				return 'block';
			}
			return 'none !important';
		}};
	}
`;
