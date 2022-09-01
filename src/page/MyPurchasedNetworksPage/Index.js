import React from 'react';
import PurchasedNetworksList from '../../components/MyPurchasedNetworkList/Index.js';
import './own-networks-page.scss';

const Index = () => {
	return (
		<div className="purchased-networks-page">
			<h2>내가 구매한 모델 목록</h2>
			<PurchasedNetworksList />
		</div>
	);
};

export default Index;
