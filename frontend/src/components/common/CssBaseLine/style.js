import styled, { createGlobalStyle } from 'styled-components';

// 自定义样式 ↓
const customizeStyle = createGlobalStyle`
	// 全局滚动条样式
	* {
		// 丝滑滚动
		scroll-behavior: smooth;

		&::-webkit-scrollbar {
			width: 4px;
			height: 4px;

			background-color: transparent;
		}

		&::-webkit-scrollbar-thumb {
			border-radius: 0;
			background-color: transparent;
		}

		&:hover::-webkit-scrollbar-thumb {
			background-color: ${({ theme }) => theme.palette.primary};
		}

		&::-webkit-scrollbar-track {
			border-radius: 0;
		}

		&:hover::-webkit-scrollbar-track {
			background-color: #000;
		}
	}

	html,
	body {
		// 移动端 click事件触发的背景色变更
		-webkit-tap-highlight-color: transparent;
	}

	
	// 某些资源标签 不可选择
	img,
	video,
	svg,
	iframe,
	canvas,
	figure {
		user-select: none;
	}

	// 响应式 字体
	html {
		@media screen and (max-width: 550px) {
			& {
				font-size: 14px;
			}
		}

		@media screen and (max-width: 750px) and (min-width: 550px) {
			& {
				font-size: 15px;
			}
		}

		@media screen and (max-width: 950px) and (min-width: 750px) {
			& {
				font-size: 16px;
			}
		}
		@media screen and (max-width: 1150px) and (min-width: 950px) {
			& {
				font-size: 17px;
			}
		}
		@media screen and (max-width: 1350px) and (min-width: 1150px) {
			& {
				font-size: 18px;
			}
		}
		@media screen and (max-width: 1550px) and (min-width: 1350px) {
			& {
				font-size: 19px;
			}
		}
		@media screen and (min-width: 1550px) {
			& {
				font-size: 20px;
			}
		}
	}
`;

export const CssBaseLineBox = styled.div`
	${customizeStyle};
`;
