import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button, Result, Row } from 'antd';

export default function PageNotFoundPage() {
	const { push } = useHistory();
	const { t } = useTranslation();
	const translatedText = {
		backToHome: t('backToHome'),
	};

	return (
		<Result status="404" title={'404'}>
			<Row justify="center">
				<Button type="primary" onClick={() => push('/')}>
					{translatedText.backToHome}
				</Button>
			</Row>
		</Result>
	);
}
