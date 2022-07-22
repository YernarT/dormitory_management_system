import styled from 'styled-components';
// 高阶组件
import { Button } from 'antd';

export const TranslateButtonStyled = styled(Button)`
	padding: 4px;

	display: flex;
	justify-content: center;
	align-items: center;

	.icon {
		${({ theme }) => theme.shape.iconAppearance.apply};
		color: #fff;
	}
`;
