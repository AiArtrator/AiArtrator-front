import React, { useEffect } from 'react';
import PurchasedNetworksList from '../../components/MyPurchasedNetworkList/Index.js';
import './purchased-networks-page.scss';

import SideNav from '../../components/SideBar/Index';
import TopBtn from '../../components/TopBtn/index';
const Index = () => {
	const pageCol = ['white', 'white', '#000080'];

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
			<SideNav pageCol={pageCol} />
			<PurchasedNetworksList />
			<TopBtn />
		</>
	);
};

export default Index;
