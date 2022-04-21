import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { pageAtom, userAtom } from '@/store';

import { useRequest, useSetState } from 'ahooks';
import { reqGetStatistic } from '@/service/api/site-admin-api';
import { fromNow } from '@/utils';

import {
	Card,
	Col,
	Row,
	Skeleton,
	Descriptions,
	Image,
	Empty,
	Button,
	InputNumber,
	message as antdMessage,
	Space,
	Statistic as AntdStatistic,
	Divider,
	List,
	Avatar,
} from 'antd';

import { StatisticStyledBox } from './style';

export default function Statistic() {
	const page = useRecoilValue(pageAtom);
	const [user, setUser] = useRecoilState(userAtom);
	const [state, setState] = useSetState({
		data: {},
	});

	// 获取所有请求
	useRequest(reqGetStatistic, {
		pollingInterval: 1500,
		pollingWhenHidden: false,

		onSuccess({ data }) {
			setState({ data });
		},
		onError({ message, needExecuteLogout, initialUser }) {
			antdMessage.error(message);

			if (needExecuteLogout) {
				setUser(initialUser);
			}
		},
	});

	// 随机头像
	const getAvatar = role => {
		let BASE_URL = 'https://joeschmoe.io/api/v1/';

		if (role === 'site admin') {
			return `${BASE_URL}female/jazebelle`;
		}
		if (role === 'org manager') {
			return `${BASE_URL}male/jia`;
		}
		if (role === 'tenant') {
			return `${BASE_URL}female/julie`;
		}
	};

	return (
		<StatisticStyledBox>
			<Row gutter={[16, 20]}>
				<Col xl={6} lg={8} md={12} xs={24}>
					<Card title="Ұйым саны">
						<AntdStatistic value={state.data?.organizations?.length ?? 0} />
					</Card>
				</Col>
				<Col xl={6} lg={8} md={12} xs={24}>
					<Card title="Тапсырыс саны">
						<AntdStatistic value={state.data?.orders?.length ?? 0} />
					</Card>
				</Col>
				<Col xl={6} lg={8} md={12} xs={24}>
					<Card title="Қолданушы саны">
						<AntdStatistic value={state.data?.users?.length ?? 0} />
					</Card>
				</Col>
			</Row>

			<div style={{ height: '20px' }}></div>

			<Row gutter={[16, 20]}>
				<Col lg={12} md={24} xs={24}>
					<Card title="Ұйымдар">
						<List
							itemLayout="horizontal"
							dataSource={state.data?.organizations ?? []}
							renderItem={item => (
								<List.Item>
									<List.Item.Meta
										title={
											<span>
												{item.fullname} ({item.name})
											</span>
										}
										description={`Жатақхана саны: ${item.dormCount}`}
									/>
								</List.Item>
							)}
						/>
					</Card>
				</Col>
				<Col lg={12} md={24} xs={24}>
					<Card title="Қолданушылар">
						<List
							itemLayout="horizontal"
							dataSource={state.data?.users ?? []}
							renderItem={item => (
								<List.Item>
									<List.Item.Meta
										avatar={<Avatar src={getAvatar(item.role)} />}
										title={
											<span>
												{item.fullname} ({item.email})
											</span>
										}
										description={item.role}
									/>
								</List.Item>
							)}
						/>
					</Card>
				</Col>
			</Row>
		</StatisticStyledBox>
	);
}
