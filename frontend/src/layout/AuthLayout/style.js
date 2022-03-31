import styled, { css } from 'styled-components';

export const AuthLayoutStyledBox = styled.div`
	width: 300px;
	max-width: 95%;
	height: max-content;
	margin-top: 28px;
	padding: 34px 24px 20px 24px;

	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: ${({ theme }) => theme.shape.borderRadius};
	background-color: rgba(255, 255, 255, 0.2);
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(4px);
`;

export const authLayoutWrapperStyle = css`
	.content {
		display: flex;
		justify-content: center;
		/* 子元素比父元素高时
			align-items: center
			属性无效
		*/
	}
`;
