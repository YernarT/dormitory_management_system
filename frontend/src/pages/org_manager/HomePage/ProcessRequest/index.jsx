import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';

import { useRequest, useSetState } from 'ahooks';
import { reqGetRequests } from '@/service/api/org-manager-api';

import { message as antdMessage, Space, Empty } from 'antd';
import { RequestCard } from '@/components';
import { ProcessRequestStyledBox } from './style';

export default function ProcessRequest() {
	const setUser = useSetRecoilState(userAtom);
	const [state, setState] = useSetState({
		requests: [],
	});

	// 获取所有请求
	const { loading: loadingReqGetRequests } = useRequest(reqGetRequests, {
		onSuccess({ requests }) {
			setState({ requests });
		},
		onError({ message, needExecuteLogout, initialUser }) {
			antdMessage.error(message);

			if (needExecuteLogout) {
				setUser(initialUser);
			}
		},
	});

	// 处理 删除请求
	const handleDeleteRequest = id => {
		console.log(id);
	};

	return (
		<ProcessRequestStyledBox>
			<div className="head">
				<h2 className="title">Өтініштер</h2>
			</div>

			<div className="requests">
				{state.requests.length > 0 ? (
					<Space direction="vertical" size={15}>
						{state.requests.map(request => (
							<RequestCard
								key={request.id}
								request={request}
								loading={loadingReqGetRequests}
								showDeleteBtn={true}
								handleDelete={handleDeleteRequest}
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
