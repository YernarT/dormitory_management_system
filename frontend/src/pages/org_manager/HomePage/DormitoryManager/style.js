import styled from 'styled-components';

export const DormitoryManagerStyledBox = styled.div`
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;

		margin-bottom: 15px;
	}

	.dorm-manager {
		position: relative;

		.delete-btn {
			position: absolute;
			top: 6px;
			right: 6px;

			cursor: pointer;
			color: ${({ theme }) => theme.palette.error};
		}
	}
`;
