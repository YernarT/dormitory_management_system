import styled from 'styled-components';

export const SearchbarStyledBox = styled.div`
	background-color: #fff;

	input {
		outline: none;
		border: none;

		height: 40px;
		padding: 8px;
		padding-right: 0;

		background-color: inherit;

		::-webkit-search-cancel-button {
			margin-left: 5px;
		}
	}
`;
