import React, { useState, useEffect } from 'react';
import './own-network-list.scss';
import OwnNetworksItem from './OwnNetworkItems/Index.js';
import axios from 'axios';

const sampleNetworks = {
	title: '샘플 모델 이름',
	description: '모델 소개',
	sampleImg: 'https://via.placeholder.com/160',
};
const Index = () => {
	//API완성되고 axios 사용시
	// const [networks, setNetworks] = useState(null);
	// const [loading, setLoading] = useState(false);

	// useEffect(() => {
	// 	//async사용하는함수는 따로 선언
	// 	const fetchData = async () => {
	// 		setLoading(true);
	// 		try {
	// 			const response = await axios.get('https ; api url');

	// 			setNetworks(response.data.network);
	// 		} catch (e) {
	// 			console.log(e);
	// 		}
	// 		setLoading(false);
	// 	};
	// 	fetchData();
	// }, []);
	// if (loading) {
	// 	//대기중일때
	// 	return (
	// 		<div className="own-list-block">
	// 			내가 구매한 모델 리스트를 불러오는 중...
	// 		</div>
	// 	);
	// }
	// if (!networks) {
	// 	//아직 networks값이 설정되지 않았을때
	// 	return null;
	// }

	//networks 값이 유효할때
	return (
		<div className="own-list-block">
			<OwnNetworksItem network={sampleNetworks} />
			<OwnNetworksItem network={sampleNetworks} />
			<OwnNetworksItem network={sampleNetworks} />
			<OwnNetworksItem network={sampleNetworks} />
			<OwnNetworksItem network={sampleNetworks} />
			<OwnNetworksItem network={sampleNetworks} />

			{/*    //axios 쓸때 코드 --> key={network.url} 이부분 수정되어야함
			{networks.map(network=>(<OwnNetworksItem key={network.url} network={network} >))} */}
		</div>
	);
};

export default Index;
