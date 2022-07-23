import type { FlattenSimpleInterpolation } from 'styled-components';

import styled from 'styled-components';

// 高阶组件
import { Form } from 'antd';
// 公共样式
import { container } from '@/assets/style';

interface AuthLayoutStyledProps {
	customStyle?: FlattenSimpleInterpolation;
}

export const AuthLayoutStyled = styled(Form)<AuthLayoutStyledProps>`
	width: 365px;
	/* 强覆盖 GuestLayout 组件样式 */
	height: auto !important;
	/* 强覆盖 antd Form 组件样式 */
	margin: auto !important;

	position: absolute;
	top: 20%;
	left: 50%;
	transform: translateX(-50%);

	${({ theme }) => theme.shape.generalApperance.apply};
	/* 强覆盖 antd Form 组件样式 */
	padding: 24px !important;

	${({ customStyle }) => customStyle}

	@media screen and (max-width: 442px) {
		${container('width')}
		top: 10%;
	}

	.title {
		text-align: center;
	}

	.last-form-item {
		margin: 0;
	}

	.form-footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 8px;

		.divider {
			margin: 0;
		}
	}
`;
