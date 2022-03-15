import styled from 'styled-components';

export const SafeAreaStyleBox = styled.div`
	width: 100%;
	height: ${({ vh }) => (vh ? `${100 * vh}px` : '100vh')};
`;
