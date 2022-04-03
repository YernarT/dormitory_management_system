import styled from 'styled-components';

export const CityStyledBox = styled.div`
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;

		margin-bottom: 15px;
	}

	.cities {
		width: calc(100% - 24px);
		margin-bottom: 15px;

		display: flex;
		flex-flow: row wrap;
		${({ hasCity }) =>
			hasCity
				? ''
				: `
        justify-content: center;
		align-items: center;`}
		gap: 12px;

		@media screen and (max-width: 768px) {
			width: 100%;
		}

		.city {
			position: relative;

			&-name {
				${({ theme }) => theme.typography.text}
			}

			.delete-btn {
				position: absolute;
				top: 6px;
				right: 6px;

				cursor: pointer;
				color: ${({ theme }) => theme.palette.error};
			}
		}
	}
`;
