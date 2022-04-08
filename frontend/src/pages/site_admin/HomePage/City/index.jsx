import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store';

import { useRequest, useMount, useSafeState, useBoolean } from 'ahooks';

import {
	reqCities,
	reqCreateCity,
	reqDeleteCity,
} from '@/service/api/site-admin-api';

import {
	message as antdMessage,
	Empty,
	Card,
	Skeleton,
	Button,
	Modal,
	Input,
	message,
} from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { CityStyledBox } from './style';

export default function City() {
	const setUser = useSetRecoilState(userAtom);

	const [cities, setCities] = useSafeState([]);

	const { runAsync: runReqCities, loading: loadingReqCities } = useRequest(
		reqCities,
		{
			manual: true,
		},
	);

	useMount(() => {
		runReqCities()
			.then(({ cities }) => setCities(cities))
			.catch(({ message, needExecuteLogout, initialUser }) => {
				antdMessage.error(message);

				if (needExecuteLogout) {
					setUser(initialUser);
				}
			});
	});

	// Add city modal
	const [
		addCityModalVisibility,
		{ setTrue: openAddCityModal, setFalse: closeAddCityModal },
	] = useBoolean(false);
	const [cityName, setCityName] = useSafeState('');

	const { runAsync: runReqCreateCity, loading: loadingReqCreateCity } =
		useRequest(data => reqCreateCity(data), { manual: true });

	const handleAddCity = () => {
		if (cityName.trim()) {
			runReqCreateCity({ name: cityName.trim() })
				.then(({ message, city }) => {
					antdMessage.success(message);
					setCities(prevState => [...prevState, city]);
					setCityName('');
					closeAddCityModal();
				})
				.catch(({ message, needExecuteLogout, initialUser }) => {
					antdMessage.error(message);

					if (needExecuteLogout) {
						setUser(initialUser);
					}
				});
		} else {
			message.warning('Жарамсыз енгізу');
		}
	};

	// Delete city
	const { runAsync: runReqDeleteCity } = useRequest(id => reqDeleteCity(id), {
		manual: true,
		throttleWait: 500,
	});

	const handleDeleteCity = id => {
		runReqDeleteCity(id)
			.then(({ message }) => {
				antdMessage.success(message);
				setCities(prevState => prevState.filter(city => city.id !== id));
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
			<CityStyledBox hasCity={Boolean(cities.length)}>
				<div className="head">
					<h2 className="title">Қалалар</h2>
					<Button
						type="primary"
						onClick={openAddCityModal}
						loading={loadingReqCreateCity}>
						<PlusOutlined />
						<span>Қала қосу</span>
					</Button>
				</div>

				<div className="cities">
					{cities.length ? (
						cities.map(city => (
							<Card key={city.id} className="city">
								<Skeleton loading={loadingReqCities} active>
									<DeleteOutlined
										className="delete-btn"
										onClick={() => handleDeleteCity(city.id)}
									/>
									<p className="city-name">{city.name}</p>
								</Skeleton>
							</Card>
						))
					) : (
						<Empty description="Қала жоқ" />
					)}
				</div>
			</CityStyledBox>

			<Modal
				title="Add City"
				visible={addCityModalVisibility}
				onOk={handleAddCity}
				okText="Құру"
				onCancel={closeAddCityModal}>
				<Input
					type="text"
					placeholder="Қала атуы"
					value={cityName}
					onChange={({ target: { value } }) => setCityName(value)}
				/>
			</Modal>
		</>
	);
}
