import styled from 'styled-components';

export const AuthLayoutStyledBox = styled.div`
	width: 300px;
	max-width: 95%;
	height: max-content;
	margin: auto;
	padding: 36px 24px 20px 24px;

	position: absolute;
	top: 36%;
	left: 50%;
	transform: translate(-50%, -36%);

	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: ${({ theme }) => theme.shape.borderRadius};
	background-color: rgba(255, 255, 255, 0.2);
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(4px);
`;
