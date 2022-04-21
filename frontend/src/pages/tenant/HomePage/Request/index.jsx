import React, { memo } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, userAtom } from '@/store';

import { useRequest, useSetState } from 'ahooks';
import {
	reqGetRequest,
	reqCreateRequest,
	reqDeleteRequest,
} from '@/service/api/tenant-api';

import {
	message as antdMessage,
	Button,
	Modal,
	Input,
	Upload,
	Space,
	Empty,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RequestCard } from '@/components/dorm';
import { RequestStyledBox } from './style';

const { TextArea } = Input;

export default function Request() {
	const setUser = useSetRecoilState(userAtom);
	const [state, setState] = useSetState({
		request: null,

		addRequestModalVisible: false,
		addRequestFormData: {
			idn: '',
			supplementary_description: '',
			appendixs: [],
		},
	});

	// 获取入住请求
	useRequest(reqGetRequest, {
		onSuccess({ request }) {
			setState({ request });
		},
		onError({ message, needExecuteLogout, initialUser }) {
			antdMessage.error(message);

			if (needExecuteLogout) {
				setUser(initialUser);
			}
		},
	});

	// 添加入住请求的请求
	const { runAsync: runReqCreateRequest, loading: loadingReqCreateRequest } =
		useRequest(data => reqCreateRequest(data), {
			manual: true,
		});

	// 处理添加入住请求
	const handleAddRequest = () => {
		let data = new FormData();
		Object.entries(state.addRequestFormData).forEach(([key, value]) => {
			if (key === 'appendixs') {
				value.forEach(file => {
					data.append(file.uid, file);
				});
			} else {
				data.append(key, value);
			}
		});

		runReqCreateRequest(data)
			.then(({ message, request }) => {
				antdMessage.success(message);
				setState({
					request,
					addRequestModalVisible: false,
					addRequestFormData: {
						idn: '',
						supplementary_description: '',
						appendixs: [],
					},
				});
			})
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	};

	// 处理删除入住请求
	const handleDeleteRequest = requestId => {
		reqDeleteRequest(requestId)
			.then(({ message }) => {
				antdMessage.success(message);
				setState({ request: null });
			})
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	};

	return (
		<>
			<RequestStyledBox>
				{state.request ? (
					<RequestCard
						request={state.request}
						handleDelete={handleDeleteRequest}
					/>
				) : (
					<Empty description="Өтініш жоқ">
						<Button
							type="primary"
							onClick={() => setState({ addRequestModalVisible: true })}>
							Өтініш құру
						</Button>
					</Empty>
				)}
			</RequestStyledBox>

			<Modal
				title="Төсек орын құру"
				visible={state.addRequestModalVisible}
				onOk={handleAddRequest}
				okText="Құру"
				onCancel={() => setState({ addRequestModalVisible: false })}>
				<Space direction="vertical" style={{ width: '100%' }} size={15}>
					<Input
						type="text"
						placeholder="ИИН нөмер"
						maxLength={12}
						value={state.addRequestFormData.idn}
						onChange={({ target: { value } }) =>
							setState(prevState => ({
								addRequestFormData: {
									...prevState.addRequestFormData,
									idn: value,
								},
							}))
						}
					/>

					<TextArea
						placeholder={'Қосымша ақпарат'}
						maxLength={512}
						showCount
						value={state.addRequestFormData.supplementary_description}
						onChange={({ target: { value } }) =>
							setState(prevState => ({
								addRequestFormData: {
									...prevState.addRequestFormData,
									supplementary_description: value,
								},
							}))
						}
					/>

					<Upload
						multiple={true}
						fileList={state.addRequestFormData.appendixs}
						beforeUpload={file => {
							if (state.addRequestFormData.appendixs.length === 5) {
								antdMessage.warning('Ең көбінде 5 құжатға рұқсат');
								return;
							}

							setState(preState => ({
								addRequestFormData: {
									...preState.addRequestFormData,
									appendixs: [...preState.addRequestFormData.appendixs, file],
								},
							}));
							return false;
						}}
						onRemove={file => {
							setState(preState => ({
								addRequestFormData: {
									...preState.addRequestFormData,
									appendixs: preState.addRequestFormData.appendixs.filter(
										image => image !== file,
									),
								},
							}));
						}}>
						<Button icon={<UploadOutlined />} loading={loadingReqCreateRequest}>
							қосымша құжаттары
						</Button>
					</Upload>
				</Space>
			</Modal>
		</>
	);
}
