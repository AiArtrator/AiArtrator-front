import React, { useState, useEffect } from 'react';
import './my-network-list.scss';
import NetworksItem from './NetworkItems/Index.js';
import { getMyNetworkListById } from '../../axios/Network';
import { useSelector } from 'react-redux';

const Index = () => {
	const userId = useSelector((state) => state.user.user.id);
	const [networks, setNetworks] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setError(null);
			setNetworks(null);
			setLoading(true);
			try {
				const response = await getMyNetworkListById(userId); // TODO : replace to getNetworkByUserId
				setNetworks(response.data.data.postList);
				console.log(response.data.data);
			} catch (err) {
				console.error(err);
				setError(err);
			}
			setLoading(false);
		};
		fetchData();
	}, []);

	// 대기중일때
	if (loading) {
		return <div className="list-block">로딩 중</div>;
	}
	if (error) return <div>에러가 발생했습니다</div>;
	// 아직 networks값이 설정되지 않았을때
	if (!networks) {
		console.log('아직 networks값이 설정되지 않음');
		return null;
	}
	console.log(networks);
	console.log('networks.postList');
	console.log(networks.postList);

	// networks 값이 유효할때
	return (
		<div className="list-block">
			<div className="now-count">내가 업로드한 모델 리스트입니다.</div>
			{/* <input
				type="search"
				placeholder="모델 키워드 또는 태그를 검색하세요."
				value={searchWord}
				onChange={handleChange}
			/>
			<button onClick={handleSearch}>검색</button>
			{result ? (
				<div className="now-count">검색결과 {resCount} 건</div>
			) : (
				<div className="now-count">현재 판매중인 모델 {networksCount} 개</div>
			)} */}

			{networks.map((network) => {
				return <NetworksItem key={network.id} network={network} />;
			})}
		</div>
	);
};

export default Index;
