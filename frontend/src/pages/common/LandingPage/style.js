import styled from 'styled-components';

export const LandingPageStyledBox = styled.div`
	height: inherit;

	overflow: hidden auto;

	.welcome {
		position: relative;

		height: 100%;

		img {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;

			width: 100%;
			height: 98%;

			object-fit: cover;
			filter: blur(4px);
		}

		.info {
			position: absolute;
			top: 40%;
			z-index: 5;
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

			.title {
				font-size: 2.4rem;
			}

			.sub-title {
				font-size: 1.4rem;
			}
		}
	}
`;
