import styled from 'styled-components';
import { Card } from 'antd';

export const DormCardStyledBox = styled(Card)`
	position: relative;

	.delete-btn {
		position: absolute;
		top: 6px;
		right: 6px;

		cursor: pointer;
		color: ${({ theme }) => theme.palette.error};
	}
`;
