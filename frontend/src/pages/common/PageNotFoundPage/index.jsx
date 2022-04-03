import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button, Result, Row } from 'antd';

export default function PageNotFoundPage() {
	const { push } = useHistory();
	const { t } = useTranslation();

	return (
		<Result status="404" title={'404'}>
			<Row justify="center">
				<Button type="primary" onClick={() => push('/')}>
					{t('backToHome')}
				</Button>
			</Row>
		</Result>
	);
}
