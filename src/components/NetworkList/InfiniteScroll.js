import React, { useState, useCallback } from 'react';
import './network-list.scss';
import NetworksItem from './NetworkItems/Index.js';
import { getNetworkList, getSearchNetwork } from '../../axios/Network';
import SearchPicto from '../../assets/search.png';
import { useNavigate } from 'react-router-dom';
import { useIntersectionObserver } from './Observer.js';

// InfiniteScroll 참고자료 https://simian114.gitbook.io/blog/undefined/react/intersectionobserverapi

const Index = () => {
	const [networks, setNetworks] = useState(null);
	const [networksCount, setNetworksCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [searchWord, setSearchWord] = useState('');
	const [resCount, setResCount] = useState(0);
	const [result, setResult] = useState('');

	const navigate = useNavigate();
	const [dataLoading, setDataLoading] = useState(false);

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
				console.log(
					'InfiniteScroll-검색 결과 개수는 ',
					response.data.data.postListCount
				);

				setResCount(response.data.data.postListCount);
				setNetworks(response.data.data.postList);
				setResult('InfiniteScroll-검색 결과 ');
			} catch (err) {
				console.log('InfiniteScroll-ERR');
				console.error(err);
				setError(err);
			}
			setLoading(false);
		};
		fetchData();
	};

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		setError(null);
	// 		setNetworks(null);
	// 		setLoading(true);
	// 		setSearchWord('');
	// 		setSearchWord('');
	// 		try {
	// 			const response = await getNetworkList(); // TODO : replace to getNetworkByUserId
	// 			setNetworks(response.data.data.postList);
	// 			console.log(response.data.data);
	// 			setNetworksCount(response.data.data.postListCount);
	// 		} catch (err) {
	// 			console.error(err);
	// 			setError(err);
	// 		}
	// 		setLoading(false);
	// 	};
	// 	fetchData();
	// }, []);

	const fetchMoreData = useCallback(async () => {
		setDataLoading(true);
		try {
			const newData = await getNetworkList();
			setNetworks(newData);
			setNetworksCount(newData.data.data.postListCount);
			console.log('InfiniteScroll-networks값');
			console.log(networks);
		} catch (err) {
			console.log('InfiniteScroll-ERR');
			console.error(err);
			setError(err);
		}
		setDataLoading(false);
		setLoading(false);
	}, [getNetworkList]);

	const setObservationTarget = useIntersectionObserver(fetchMoreData);
	console.log('Infinite Scroll 테스트 페이지 로딩 - Infinite scroll');
	// 대기중일때
	if (loading) {
		return <div className="list-block">로딩 중</div>;
	}
	if (error) return <div>에러가 발생했습니다</div>;
	// 아직 networks값이 설정되지 않았을때
	if (!networks) {
		console.log('InfiniteScroll-아직 networks값이 설정되지 않음');
		return null;
	}

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

				<img src={SearchPicto} alt="button" onClick={handleSearch} />
			</div>
			<div className="in-row">
				{result ? (
					<div className="now-count">검색결과 {resCount} 건</div>
				) : (
					<div className="now-count">현재 판매중인 모델 {networksCount} 개</div>
				)}
				<button
					onClick={() => {
						navigate('/NetworkUpload');
					}}
				>
					모델 업로드하기
				</button>
			</div>

			{/* <div className="now-count">현재 판매중인 모델 {networksCount} 개</div> */}
			{networks.map((network) => {
				return <NetworksItem key={network.id} network={network} />;
			})}
			{dataLoading && <div>Loading...</div>}
			{/* 아래의 div가 관찰대상!!! */}
			{!dataLoading && <div ref={setObservationTarget}></div>}
		</div>
	);
};

export default Index;
