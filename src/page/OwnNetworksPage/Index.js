import React from 'react';
import OwnNetworksList from '../../components/OwnNetworkList/Index.js';
import './own-networks-page.scss';

const Index = () => {
	return (
		<div className="own-networks-page">
			<h2>내가 구매한 모델 목록</h2>
			<OwnNetworksList />
		</div>
	);
};

export default Index;
