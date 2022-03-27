import { createGlobalStyle } from 'styled-components';

export const AntdComponentStyleModify = createGlobalStyle`
	.dms-btn {
		box-sizing: content-box;
		padding: 5px 10px;
	}

	.dms-message {
		.dms-message-notice-content {
			.dms-message-custom-content {
				span[role="img"] {
					margin-right: 8px;
				}
			}

			.dms-message-info {
				span[role="img"] {
					color: ${({ theme }) => theme.palette.primary};
				}
			}	
			
			.dms-message-warning {
				span[role="img"] {
					color: ${({ theme }) => theme.palette.warning};
				}
			}

			.dms-message-success {
				span[role="img"] {
					color: ${({ theme }) => theme.palette.success};
				}
			}

			.dms-message-error {
				span[role="img"] {
					color: ${({ theme }) => theme.palette.error};
				}
			}

			.dms-message-loading {
				span[role="img"] {
					color: ${({ theme }) => theme.palette.primary};
				}
			}
		}
	}
`;
