import React, { useState, useEffect } from 'react';
import './my-network-list.scss';
import NetworksItem from './NetworkItems/Index.js';
import { getMyNetworkListById } from '../../axios/Network';
import { useSelector } from 'react-redux';
import SearchPicto from '../../assets/search.png';
import { useNavigate } from 'react-router-dom';

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

	useEffect(() => {
		const fetchData = async () => {
			setError(null);
			setNetworks(null);
			setLoading(true);
			try {
				const response = await getMyNetworkListById(userId, page, searchWord);
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
			} catch (err) {
				console.error(err);
				setError(err);
			}
			setLoading(false);
		};
		fetchData();
	};

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
				/>
				<img src={SearchPicto} alt="button" onClick={handleSearch} />
			</div>
			<div className="now-count">모델 개수는 00개 입니다.</div>

			{networks.map((network) => {
				return <NetworksItem key={network.id} network={network} />;
			})}
		</div>
	);
};

export default Index;
