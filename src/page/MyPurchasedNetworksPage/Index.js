import React, { useEffect } from 'react';
import PurchasedNetworksList from '../../components/MyPurchasedNetworkList/Index.js';
import './purchased-networks-page.scss';

import SideNav from '../../components/SideBar/Index';
import TopBtn from '../../components/TopBtn/index';
const Index = () => {
	const scrollTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		scrollTop();
	}, []);

	return (
		<>
			<SideNav />
			<PurchasedNetworksList />
			<TopBtn />
		</>
	);
};

export default Index;
