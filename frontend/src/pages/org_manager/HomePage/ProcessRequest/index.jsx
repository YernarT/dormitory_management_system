import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';

import { useRequest, useSetState } from 'ahooks';
import { reqGetOrders } from '@/service/api/org-manager-api';

import { message as antdMessage, Space, Empty } from 'antd';
import { OrderCard } from '@/components/dorm';
import { ProcessRequestStyledBox } from './style';

export default function ProcessRequest() {
	const setUser = useSetRecoilState(userAtom);
	const [state, setState] = useSetState({
		orders: [],
	});

	// 获取所有请求
	useRequest(reqGetOrders, {
		pollingInterval: 1500,
		pollingWhenHidden: false,

		onSuccess({ orders }) {
			setState({ orders });
		},
		onError({ message, needExecuteLogout, initialUser }) {
			antdMessage.error(message);

			if (needExecuteLogout) {
				setUser(initialUser);
			}
		},
	});

	// 处理 请求状态的更新
	const afterHandleResult = orders => {
		setState({ orders });
	};

	const notAgreeOrders = state.orders.filter(order => !order.status);

	return (
		<ProcessRequestStyledBox>
			<div className="head">
				<h2 className="title">Өтініштер</h2>
			</div>

			<div className="orders">
				{notAgreeOrders.length > 0 ? (
					<Space direction="vertical" size={15}>
						{notAgreeOrders.map(order => (
							<OrderCard
								key={order.id}
								order={order}
								showDeleteBtn={true}
								afterHandleResult={afterHandleResult}
							/>
						))}
					</Space>
				) : (
					<Empty description="Өтініш жоқ" />
				)}
			</div>
		</ProcessRequestStyledBox>
	);
}
