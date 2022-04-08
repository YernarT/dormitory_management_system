import styled from 'styled-components';

export const OrganizationStyledBox = styled.div`
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;

		margin-bottom: 15px;
	}

	.org {
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
	}
`;
