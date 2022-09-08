import React, { useState, useEffect } from 'react';
import './network-list.scss';

import NetworksItem from './NetworkItems/Index.js';
import { getNetworkList, getSearchNetwork } from '../../axios/Network';
import TopBtn from '../TopBtn';
import UploadBtn from '../UploadBtn/Index';

import SearchPicto from '../../assets/search.png';

const Index = () => {
	const [networks, setNetworks] = useState(null);
	const [networksCount, setNetworksCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [searchWord, setSearchWord] = useState('');
	const [resCount, setResCount] = useState(0);
	const [result, setResult] = useState('');

	const handleChange = (e) => {
		setSearchWord(e.target.value);
	};

	const handleSearch = () => {
		const fetchData = async () => {
			setError(null);
			setLoading(true);
			setNetworks(null);
			try {
				console.log(searchWord);
				const response = await getSearchNetwork(searchWord); // TODO : replace to getNetworkByUserId
				console.log('검색 결과 개수는 ', response.data.data.postListCount);

				setResCount(response.data.data.postListCount);
				setNetworks(response.data.data.postList);
				setResult('검색 결과 ');
			} catch (err) {
				console.error(err);
				setError(err);
			}
			setLoading(false);
		};
		fetchData();
	};

	useEffect(() => {
		const fetchData = async () => {
			setError(null);
			setNetworks(null);
			setLoading(true);
			setSearchWord('');
			setSearchWord('');
			try {
				const response = await getNetworkList(); // TODO : replace to getNetworkByUserId
				setNetworks(response.data.data.postList);
				console.log(response.data.data);
				setNetworksCount(response.data.data.postListCount);
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
	console.log('networksCount');
	console.log(networksCount);

	// networks 값이 유효할때
	return (
		<div className="list-block">
			<div className="in-row">
				<input
					type="search"
					placeholder="모델 키워드 또는 태그를 검색하세요."
					value={searchWord}
					onChange={handleChange}
				/>

				<img
					className="search-img"
					src={SearchPicto}
					alt="button"
					onClick={handleSearch}
				/>
			</div>
			<div className="in-row">
				{result ? (
					<div className="now-count">검색결과 {resCount} 건</div>
				) : (
					<div className="now-count">현재 판매중인 모델 {networksCount} 개</div>
				)}
				<UploadBtn />
			</div>

			{/* <div className="now-count">현재 판매중인 모델 {networksCount} 개</div> */}
			{networks.map((network) => {
				return <NetworksItem key={network.id} network={network} />;
			})}
			<TopBtn />
		</div>
	);
};

export default Index;
