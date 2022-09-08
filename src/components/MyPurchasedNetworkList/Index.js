import React, { useState, useEffect } from 'react';
import './my-network-list.scss';

import NetworksItem from './PurchasedNetworkItems/Index.js';
import { getMyNetworkListById } from '../../axios/Network';
import Loading from '../Loading/Loading';
import UploadBtn from '../UploadBtn/Index';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import SearchPicto from '../../assets/search.png';
import Refresh from '../../assets/refresh.png';

// 내가 구독한 모델 페이지
const Index = () => {
	const { t } = useTranslation();

	const userId = useSelector((state) => state.user.user.id);
	const nickname = useSelector((state) => state.user.user.nickname);

	const page = 'inference';
	const [networks, setNetworks] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
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
				setError(err);
			}

			setLoading(false);
		};
		fetchData();
	}, []);

	const handleChange = (e) => {
		setSearchWord(e.target.value);
	};
	const handleSearch = () => {
		const fetchData = async () => {
			setError(null);
			setLoading(true);
			setNetworks(null);
			try {
				const response = await getMyNetworkListById(userId, page, searchWord);
				setNetworks(response.data.data.postList);
				setNetworkCnt(response.data.data.postList.length);
				setSearchWord('');
			} catch (err) {
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
				<label>
					{nickname}
					{t('pur_title')}
				</label>
				<UploadBtn />
			</div>
			<div className="in-row">
				<input
					type="search"
					placeholder={t('seachplac_h')}
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
			<div className="now-count">
				{t('pur_cnt')} {networkCnt}
			</div>

			{networks.map((network) => {
				return <NetworksItem key={network.id} network={network} />;
			})}
			{refresh ? (
				<img className="refresh-btn" src={Refresh} onClick={onRefresh} />
			) : null}
		</div>
	);
};

export default Index;
