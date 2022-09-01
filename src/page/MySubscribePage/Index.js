import React, { useEffect } from 'react';

import MySubscribe from '../../components/MySubscribeList/Index';
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
			<MySubscribe />
			<TopBtn />
		</>
	);
};

export default Index;
