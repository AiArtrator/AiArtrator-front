import React, { useState, useEffect } from 'react';
import './own-network-list.scss';
import OwnNetworksItem from './OwnNetworkItems/Index.js';
import { getNetworkList } from '../../axios/Network';

const sampleNetworks = {
	title: '샘플 모델 이름',
	description: '모델 소개',
	sampleImg: 'https://via.placeholder.com/160',
};
const Index = () => {
	// API완성되고 axios 사용시
	const [networks, setNetworks] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await getNetworkList(); // TODO : replace to getNetworkByUserId
				setNetworks(response.data.data);
			} catch (err) {
				console.error(err);
			}
			setLoading(false);
		};
		fetchData();
	}, []);

	// 대기중일때
	if (loading) {
		return (
			<div className="own-list-block">
				내가 구매한 모델 리스트를 불러오는 중...
			</div>
		);
	}

	// 아직 networks값이 설정되지 않았을때
	if (!networks) {
		return null;
	}

	console.log(networks);
	// networks 값이 유효할때
	return (
		<div className="own-list-block">
			<OwnNetworksItem network={sampleNetworks} />
			<OwnNetworksItem network={sampleNetworks} />
			<OwnNetworksItem network={sampleNetworks} />
			<OwnNetworksItem network={sampleNetworks} />
			<OwnNetworksItem network={sampleNetworks} />
			<OwnNetworksItem network={sampleNetworks} />

			{networks.map((network) => (
				<OwnNetworksItem key={network.id} network={network} />
			))}
		</div>
	);
};

export default Index;
