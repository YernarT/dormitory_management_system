import styled from 'styled-components';
import { hideScrollbar } from '@/assets/style/common-style';

export const ProfilePageStyledBox = styled.div`
	height: inherit;
	overflow: hidden auto;

	${hideScrollbar};

	.profile-tabs {
		@media screen and (min-width: 768px) { margin-top: 15px; }
	}

	form {
		.form-submit-button {
			margin-top: 12px;
		}

		@media (min-width: 576px) {
			& {
				width: 100%;
			}
		}
		@media (min-width: 768px) {
			& {
				width: 75%;
			}
		}
		@media (min-width: 992px) {
			& {
				width: 60%;
			}
		}
		@media (min-width: 1200px) {
			& {
				width: 50%;
			}
		}
		@media (min-width: 1400px) {
			& {
				width: 40%;
			}
		}
	}
`;
