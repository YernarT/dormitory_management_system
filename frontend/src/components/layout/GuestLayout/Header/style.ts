import styled from 'styled-components';
import { container } from '@/assets/style';

export const HeaderStyled = styled.header`
	width: 100%;
	height: 64px;
	line-height: 64px;
	${container('padding')}
	background: #fff;

	display: flex;
	align-items: center;

	position: relative;
	user-select: none;

	/* Logo */
	.logo {
		width: 54px;
		height: 54px;
		object-fit: cover;

		@media screen and (max-width: 768px) {
			width: 48px;
			height: 48px;
		}
		@media screen and (max-width: 576px) {
			width: 36px;
			height: 46px;
		}
	}

	/* Site title */
	.title {
		font-size: 1rem;
		margin: 0 0 0 4px;

		@media screen and (max-width: 576px) {
			font-size: smaller;

			width: min-content;
			margin: 0 0 0 8px;
		}
	}
`;

interface MenuBarStyledProps {
	navListVisible: boolean;
}
export const MenuBarStyled = styled.nav<MenuBarStyledProps>`
	margin: 0 24px 0 auto;

	display: flex;
	align-items: center;
	gap: 24px;

	cursor: pointer;

	.item {
		display: flex;
		align-items: center;
		gap: 4px;

		position: relative;

		@media screen and (max-width: 920px) {
			display: none;
		}

		::after {
			content: '';
			width: 100%;
			height: 2.5px;
			background: ${({ theme }) => theme.palette.primary};

			position: absolute;
			bottom: 0;
			left: 0;
			transform: translateY(100%);
			opacity: 0;

			transition: transform 0.3s ease, opacity 0.3s ease;
		}

		:hover {
			::after {
				transform: translateY(0);
				opacity: 1;
			}
		}

		.icon {
			${({ theme }) => theme.shape.iconAppearance.apply}
		}
	}

	.active {
		::after {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.burger-btn {
		@media screen and (min-width: 920px) {
			display: none;
		}

		cursor: pointer;
		${({ theme }) => theme.shape.iconAppearance.apply}
	}

	.navlist {
		@media screen and (min-width: 920px) {
			display: none;
		}

		display: flex;
		flex-direction: column;
		align-items: center;

		/* 基于 Header 组件定位 */
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 900;

		width: 100%;
		/* 减掉 Header, Footer 高度 */
		height: calc(100vh - 100% - 24px);
		padding: 0;
		background: #fff;

		transform: ${({ navListVisible }) =>
			navListVisible ? 'translateX(0)' : 'translateX(-100%)'};

		transition: transform 0.3s ease;

		.item {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 4px;

			width: 100%;
			position: relative;

			::after {
				content: '';
				width: 100%;
				height: 2.5px;
				background: ${({ theme }) => theme.palette.primary};

				position: absolute;
				bottom: 0;
				left: 0;

				transform: translateY(0);
				opacity: 1;
			}

			.icon {
				${({ theme }) => theme.shape.iconAppearance.apply}
			}
		}
	}
`;
