import styled from 'styled-components';

import { Layout } from 'antd';
const { Header } = Layout;

export const HeaderStyledBox = styled(Header)`
	/* pulic style */
	padding: 0 24px;

	display: flex;
	align-items: center;

	background-color: #fff;
	user-select: none;

	.logo {
		width: 54px;
		height: 54px;
		object-fit: cover;
	}

	.title {
		${({ theme }) => theme.typography.title};
		font-weight: bolder;

		margin-left: 4px;
	}

    .toolbar {
        margin-left: auto;
    }
`;
