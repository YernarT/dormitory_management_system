import styled, { keyframes } from 'styled-components';

const bigAndSmall = keyframes`
	from {
		transform: scale(0.75);
	}

	to {
		transform: scale(1.1);
	}
`;

export const CommonLoadingStyledBox = styled.div`
	width: 200px;
	height: 200px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	user-select: none;
	pointer-events: none;

	.favicon {
		animation: ${bigAndSmall} 0.85s ease alternate-reverse infinite;
	}

	.help-text {
		${({ theme }) => theme.typography.title};
	}
`;
