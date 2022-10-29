import React, { useState, useEffect } from 'react';
import './network-list.scss';

import { useTranslation } from 'react-i18next';

import NetworksItem from './NetworkItems/Index.js';
import { getNetworkList, getSearchNetwork } from '../../axios/Network';
import TopBtn from '../TopBtn';
import UploadBtn from '../UploadBtn/Index';
import Loading from '../Loading/Loading';

import SearchPicto from '../../assets/search.png';

const Index = () => {
	const { t } = useTranslation();

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
				const response = await getSearchNetwork(searchWord); // TODO : replace to getNetworkByUserId

				setResCount(response.data.data.postListCount);
				setNetworks(response.data.data.postList);
				setResult(t('serchres'));
			} catch (err) {
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
				const response = await getNetworkList();
				setNetworks(response.data.data.postList);
				setNetworksCount(response.data.data.postListCount);
			} catch (err) {
				setError(err);
			}
			setLoading(false);
		};
		fetchData();
	}, []);

	if (loading) return <Loading />;

	if (error) return <Loading />;

	if (!networks) return <Loading />;

	return (
		<div className="list-block">
			<div className="in-row">
				<input
					type="search"
					placeholder={t('seachplac_h')}
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
					<div className="now-count">
						{t('seachres')} {resCount}
					</div>
				) : (
					<div className="now-count">
						{t('modelcnt')}
						{networksCount}{' '}
					</div>
				)}
				<UploadBtn />
			</div>

			{networks.map((network) => {
				return <NetworksItem key={network.id} network={network} />;
			})}
			<TopBtn />
		</div>
	);
};

export default Index;
