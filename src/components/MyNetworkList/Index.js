import React, { useState, useEffect } from 'react';
import './my-network-list.scss';

import NetworksItem from './NetworkItems/Index.js';
import Loading from '../Loading/Loading';
import UploadBtn from '../UploadBtn/Index';

import { getMyNetworkListById } from '../../axios/Network';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import SearchPicto from '../../assets/search.png';
import Refresh from '../../assets/refresh.png';

// 내가 업로드한 모델 페이지
const Index = () => {
	const { t } = useTranslation();

	const userId = useSelector((state) => state.user.user.id);
	const nickname = useSelector((state) => state.user.user.nickname);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [searchWord, setSearchWord] = useState('');

	const [networks, setNetworks] = useState(null);
	const [networkCnt, setNetworkCnt] = useState(0);
	const [refresh, setRefresh] = useState(false);
	const page = 'upload';

	useEffect(() => {
		const fetchData = async () => {
			setError(null);
			setNetworks(null);
			setLoading(true);
			try {
				const response = await getMyNetworkListById(userId, page, searchWord);
				setNetworks(response.data.data.postList);
				setNetworkCnt(response.data.data.postList.length);
				console.log(response.data.data);
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
				<label>
					{nickname} {t('myup_title')}
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
				{t('myup_cnt')} {networkCnt}
			</div>

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
