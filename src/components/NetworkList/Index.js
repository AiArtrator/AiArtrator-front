import React, { useState, useEffect } from 'react';
import './network-list.scss';
import NetworksItem from './NetworkItems/Index.js';
import axios from 'axios';

const Index = () => {
	const [networks, setNetworks] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await axios.get('/api/post/list');
				setNetworks(response.data.networks);
			} catch (e) {
				console.log(e);
			}
			setLoading(false);
		};
		fetchData();
	}, []);
	if (loading) {
		return (
			<div className="network-list-block">모델 리스트를 불러오는 중...</div>
		);
	}
	if (!networks) {
		return null;
	}

	// networks 값이 유효할때
	return (
		<div className="network-list-block">
			{networks.map((network) => (
				<NetworksItem key={network.url} network={network} />
			))}
		</div>
	);
};

export default Index;
