import styled from 'styled-components';

export const CommonLoadingStyledBox = styled.div`
	width: 200px;
	height: 200px;

	display: flex;
	align-items: center;
	justify-content: center;

	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	user-select: none;
	pointer-events: none;
`;
