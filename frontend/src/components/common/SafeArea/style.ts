import styled from 'styled-components';

export const SafeAreaStyled = styled.div<{ vh: number | null }>`
	width: 100%;
	height: ${({ vh }) => (vh ? `${100 * vh}px` : '100vh')};
`;
