import styled from 'styled-components';

export const ProfilePageStyledBox = styled.div`
	height: inherit;

	.profile-tabs {
		margin-top: 15px;
	}

	form {
		.form-submit-button {
			width: 100%;
			padding: 5px 0;
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
