import React, { useState, useEffect } from 'react';
import './my-network-list.scss';

import NetworksItem from './NetworkItems/Index.js';
import { getMyNetworkListById } from '../../axios/Network';
import Loading from '../../components/Loading/Loading';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SearchPicto from '../../assets/search.png';
import Refresh from '../../assets/refresh.png';

// 내가 구독한 모델 페이지
const Index = () => {
	const navigate = useNavigate();
	const userId = useSelector((state) => state.user.user.id);
	const nickname = useSelector((state) => state.user.user.nickname);
	const [networks, setNetworks] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const page = 'subscribe';
	const [searchWord, setSearchWord] = useState('');
	const [networkCnt, setNetworkCnt] = useState(0);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setError(null);
			setNetworks(null);
			setLoading(true);
			try {
				const response = await getMyNetworkListById(userId, page, searchWord);
				setNetworks(response.data.data.postList);
				setNetworkCnt(response.data.data.postList.length);
			} catch (err) {
				console.error(err);
				setError(err);
			}

			setLoading(false);
		};
		fetchData();
	}, []);

	const onRemove = (id) => {
		setNetworks(networks.filter((data) => data.id !== id));
	};

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
				const response = await getMyNetworkListById(userId, page, searchWord);
				setNetworks(response.data.data.postList);
				setNetworkCnt(response.data.data.postList.length);
				setSearchWord('');
			} catch (err) {
				console.error(err);
				setError(err);
			}
			setRefresh(true);
			setLoading(false);
		};
		fetchData();
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') handleSearch();
	};

	const onRefresh = () => {
		setRefresh(false);
		handleSearch();
	};

	if (loading) return <Loading />;
	if (error) return <Loading />;
	if (!networks) return <Loading />;

	return (
		<div className="list-block">
			<div className="in-row">
				<label>{nickname} 님이 구독중인 모델 리스트입니다.</label>
				<button
					onClick={() => {
						navigate('/NetworkUpload');
					}}
				>
					모델 업로드하기
				</button>
			</div>
			<div className="in-row">
				<input
					type="search"
					placeholder="모델 키워드 또는 태그를 검색하세요."
					value={searchWord}
					onChange={handleChange}
					onKeyPress={handleKeyPress}
				/>
				<img
					className="search-btn"
					src={SearchPicto}
					alt="button"
					onClick={handleSearch}
				/>
			</div>
			<div className="now-count">모델 개수는 {networkCnt}개 입니다.</div>

			{networks.map((network) => {
				return (
					<NetworksItem
						key={network.id}
						network={network}
						onRemove={onRemove}
					/>
				);
			})}
			{refresh ? (
				<img className="refresh-btn" src={Refresh} onClick={onRefresh} />
			) : null}
		</div>
	);
};

export default Index;
