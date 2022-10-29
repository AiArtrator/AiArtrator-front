import React, { useEffect } from 'react';

import MySubscribe from '../../components/MySubscribeList/Index';
import SideNav from '../../components/SideBar/Index';
import TopBtn from '../../components/TopBtn/index';
const Index = () => {
	const pageCol = ['white', '#000080', 'white'];

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
			<MySubscribe />
			<TopBtn />
		</>
	);
};

export default Index;
