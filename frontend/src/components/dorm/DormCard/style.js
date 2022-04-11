import styled from 'styled-components';

export const DormCardStyledBox = styled.div`
	position: relative;

	.delete-btn {
		position: absolute;
		top: 6px;
		right: 6px;

		cursor: pointer;
		color: ${({ theme }) => theme.palette.error};

		display: ${({ showDeleteBtn }) => (showDeleteBtn ? 'block' : 'none')};
	}
`;
