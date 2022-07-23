import styled from 'styled-components';

export const LandingPageStyledBox = styled.div`
	position: relative;

	img {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;

		width: 100%;
		height: 100%;

		object-fit: cover;
		filter: blur(3px);
	}

	.info {
		position: absolute;
		top: 40%;
		z-index: 2;
		transform: translateY(-40%);

		width: 100%;
		padding: 0 10px;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 24px;

		[class*='title'] {
			line-height: 100%;
			margin: 0;

			color: #fff;
			text-align: center;
			text-shadow: 0 0 4px #000;
		}
	}
`;
