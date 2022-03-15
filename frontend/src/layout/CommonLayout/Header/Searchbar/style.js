import styled from 'styled-components';

export const SearchbarStyledBox = styled.div`
	background-color: #fff;

	input {
		outline: none;
		border: none;

		height: 40px;
		padding: 8px;
		padding-right: 0;

		font-family: ${({ theme }) => theme.typography.subtitle2.fontFamily};
		font-weight: ${({ theme }) => theme.typography.subtitle2.fontWeight};
		font-size: ${({ theme }) => theme.typography.subtitle2.fontSize};
		line-height: ${({ theme }) => theme.typography.subtitle2.lineHeight};
		letter-spacing: ${({ theme }) => theme.typography.subtitle2.letterSpacing};

		background-color: inherit;

		::-webkit-search-cancel-button {
			margin-left: 5px;
		}
	}
`;
