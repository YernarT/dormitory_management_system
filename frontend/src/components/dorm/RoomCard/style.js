import styled from 'styled-components';

export const RoomCardStyledBox = styled.div`
	position: relative;
	margin: 4px 8px;

	cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};

	transition: box-shadow 0.3s ease;

	&:hover {
		box-shadow: ${({ clickable, theme }) =>
			clickable ? `0 0 2px 2px ${theme.palette.primary}` : 'none'};
	}

	.delete-btn {
		position: absolute;
		top: 6px;
		right: 6px;

		cursor: pointer;
		color: ${({ theme }) => theme.palette.error};

		display: ${({ showDeleteBtn }) => (showDeleteBtn ? 'block' : 'none')};
	}
`;
